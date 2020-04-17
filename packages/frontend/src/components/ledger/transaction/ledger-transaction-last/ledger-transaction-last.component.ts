import { Component, ViewContainerRef, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { PipeBaseService, ViewUtil, WindowService } from '@ts-core/frontend-angular';
import { LedgerInfo, LedgerBlock, LedgerBlockTransaction } from '@hlf-explorer/common/ledger';
import { ITransportFabricTransaction } from '@ts-core/blockchain-fabric/transport/block';
import { FabricTransactionValidationCode } from '@ts-core/blockchain-fabric/api/IFabricTransaction';
import { PipeService } from '../../../../services/PipeService';
import * as _ from 'lodash';
import { TextHighlightUtil } from '../../../../lib/util/TextHighlightUtil';
import { LedgerBlockTransactionWrapper } from '../../../../lib/ledger/LedgerBlockTransactionWrapper';

@Component({
    selector: 'ledger-transaction-last',
    templateUrl: 'ledger-transaction-last.component.html'
})
export class LedgerTransactionLastComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _transaction: LedgerBlockTransaction;

    public name: string;
    public date: string;
    public userId: string;
    public status: string;
    public isExecuted: boolean;

    public request: string;
    public response: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, private pipe: PipeService) {
        super();
        ViewUtil.addClasses(element, 'd-flex flex-grow-1 align-items-center');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitTransactionProperties(): void {
        let value = null;

        let transaction = new LedgerBlockTransactionWrapper(this.transaction);

        value = this.pipe.momentDateFromNow.transform(transaction.createdDate, null);
        if (value !== this.date) {
            this.date = value;
        }

        value = transaction.requestName;
        if (value !== this.name) {
            this.name = value;
        }

        value = transaction.requestUserId;
        if (value !== this.userId) {
            this.userId = value;
        }

        value = transaction.isExecuted;
        if (value !== this.isExecuted) {
            this.isExecuted = value;
        }

        value = transaction.isExecuted ? '✔' : '✘';
        if (value !== this.status) {
            this.status = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public get transaction(): LedgerBlockTransaction {
        return this._transaction;
    }
    @Input()
    public set transaction(value: LedgerBlockTransaction) {
        if (value === this._transaction) {
            return;
        }
        this._transaction = value;
        if (this._transaction) {
            this.commitTransactionProperties();
        }
    }
}
