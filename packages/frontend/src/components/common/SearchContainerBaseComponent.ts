import { ElementRef } from '@angular/core';
import { Loadable, LoadableStatus } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import * as _ from 'lodash';
import { Transport } from '@ts-core/common/transport';
import { TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import { ILedgerSearchResponse } from '@hlf-explorer/common/api/ledger';
import { RouterService } from '../../services/RouterService';
import { ObjectUtil } from '@ts-core/common/util';

export class SearchContainerBaseComponent extends Loadable {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public query: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, protected transport: Transport, protected router: RouterService) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    public async submit(): Promise<void> {
        if (this.isLoading) {
            return;
        }

        this.status = LoadableStatus.LOADING;
        try {
            let item = await this.transport.sendListen(
                new TransportHttpCommandAsync<ILedgerSearchResponse>('ledger/search', { data: { query: this.query } })
            );
            if (ObjectUtil.instanceOf(item.value, ['requestId', 'blockNumber'])) {
                this.router.transactionOpen(item.value);
            } else {
                this.router.blockOpen(item.value);
            }
        } finally {
            this.status = LoadableStatus.NOT_LOADED;
        }
    }
}
