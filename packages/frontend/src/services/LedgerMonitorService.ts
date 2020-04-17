import { Injectable } from '@angular/core';
import { Loadable, LoadableStatus, LoadableEvent } from '@ts-core/common';
import { ExtendedError } from '@ts-core/common/error';
import { FilterableMapCollection, MapCollection } from '@ts-core/common/map';
import { TransportHttp } from '@ts-core/common/transport/http';
import { LedgerBlockMapCollection } from '../lib/ledger/LedgerBlockMapCollection';
import { NotificationService, WindowService } from '@ts-core/frontend-angular';
import * as io from 'socket.io-client';
import { SettingsService } from './SettingsService';
import { LEDGER_SOCKET_NAMESPACE, LedgerSocketEvent } from '@hlf-explorer/common/api/ledger';
import { LedgerBlock, LedgerInfo } from '@hlf-explorer/common/ledger';
import * as _ from 'lodash';
import { ObservableData } from '@ts-core/common/observer';
import { TransformUtil } from '@ts-core/common/util';
import { LedgerBlockTransactionsLast } from '@hlf-explorer/common/ledger/LedgerBlockTransactionsLast';
import { PaginableDataSourceMapCollection } from '@ts-core/common/map/dataSource';
import { LedgerService } from './LedgerService';

@Injectable()
export class LedgerMonitorService extends Loadable<void, void> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private error: ExtendedError;
    private ledgers: FilterableMapCollection<LedgerInfo>;

    private _socket: SocketIOClient.Socket;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        private transport: TransportHttp,
        private settings: SettingsService,
        private windows: WindowService,
        private notifications: NotificationService,
        private service: LedgerService
    ) {
        super();
        this.ledgers = new FilterableMapCollection('id');
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitStatusChangedProperties(oldStatus: LoadableStatus, newStatus: LoadableStatus): void {
        super.commitStatusChangedProperties(oldStatus, newStatus);

        switch (newStatus) {
            case LoadableStatus.LOADING:
                this.observer.next(new ObservableData(LoadableEvent.STARTED));
                break;
            case LoadableStatus.LOADED:
                this.observer.next(new ObservableData(LoadableEvent.COMPLETE));
                break;
            case LoadableStatus.ERROR:
            case LoadableStatus.NOT_LOADED:
                this.observer.next(new ObservableData(LoadableEvent.ERROR, null, this.error));
                break;
        }

        if (oldStatus === LoadableStatus.LOADING) {
            this.observer.next(new ObservableData(LoadableEvent.FINISHED));
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Socket Event Handlers
    //
    //--------------------------------------------------------------------------

    protected exceptionHandler = (error: ExtendedError): void => {
        this.windows.info(error.message);
    };

    protected ledgersHandler = (items: Array<LedgerInfo>): void => {
        this.ledgers.clear();
        for (let info of items) {
            this.ledgers.add(LedgerInfo.toClass(info));
        }
        this.service.blocks.conditions.ledgerId = this.ledger.id;
        this.service.transactions.conditions.ledgerId = this.ledger.id;
    };

    protected ledgerUpdatedHandler = (ledger: Partial<LedgerInfo>): void => {
        let item = this.ledgers.get(ledger.id.toString());
        if (!item) {
            return;
        }


        let block = LedgerBlock.toClass(ledger.blockLast);

        item.blockLast = block;
        item.blocksLast.add(block);
        item.transactionsLast.addItems(block.transactions);
    };

    protected socketErrorHandler = (event: string): void => {
        this.error = new ExtendedError(event);
        this.status = LoadableStatus.ERROR;
    };

    protected socketConnectedHandler = (): void => {
        this.notifications.remove(this.socketDisconnectNotificationId);
        this.status = LoadableStatus.LOADED;
    };

    protected socketDisconnectedHandler = async (): Promise<void> => {
        this.status = LoadableStatus.NOT_LOADED;
        if (this.notifications.has(this.socketDisconnectNotificationId)) {
            return;
        }
        await this.notifications.question('error.socketDisconnected', null, null, { id: this.socketDisconnectNotificationId }).yesNotPromise;
        this.connect();
    };

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public connect(): void {
        if (this.isLoaded || this.isLoading) {
            return;
        }
        this.socket = io.connect(this.url);
        this.status = LoadableStatus.LOADING;
    }

    public disconnect(): void {
        if (this.status === LoadableStatus.NOT_LOADED || this.isError) {
            return;
        }
        this.socket = null;
        this.status = LoadableStatus.NOT_LOADED;
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    //--------------------------------------------------------------------------

    protected get socket(): SocketIOClient.Socket {
        return this._socket;
    }

    protected set socket(value: SocketIOClient.Socket) {
        if (value === this._socket) {
            return;
        }
        if (this._socket) {
            this._socket.off(LedgerSocketEvent.EXCEPTION, this.exceptionHandler);
            this._socket.off(LedgerSocketEvent.LEDGERS, this.ledgersHandler);
            this._socket.off(LedgerSocketEvent.LEDGER_UPDATED, this.ledgerUpdatedHandler);
            this._socket.removeEventListener('error', this.socketErrorHandler);
            this._socket.removeEventListener('connect', this.socketConnectedHandler);
            this._socket.removeEventListener('disconnect', this.socketDisconnectedHandler);
            this._socket.disconnect();
        }

        this._socket = value;

        if (this._socket) {
            this._socket.on(LedgerSocketEvent.EXCEPTION, this.exceptionHandler);
            this._socket.on(LedgerSocketEvent.LEDGERS, this.ledgersHandler);
            this._socket.on(LedgerSocketEvent.LEDGER_UPDATED, this.ledgerUpdatedHandler);
            this._socket.addEventListener('error', this.socketErrorHandler);
            this._socket.addEventListener('connect', this.socketConnectedHandler);
            this._socket.addEventListener('disconnect', this.socketDisconnectedHandler);
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected get socketDisconnectNotificationId(): string {
        return `socketDisconnect`;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get url(): string {
        return `${this.settings.socketUrl}${LEDGER_SOCKET_NAMESPACE}`;
    }

    public get ledger(): LedgerInfo {
        return this.ledgers.collection[0];
    }
}
