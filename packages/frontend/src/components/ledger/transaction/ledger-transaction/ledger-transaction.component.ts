import { Component, ViewContainerRef, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { PipeBaseService, ViewUtil, WindowService } from '@ts-core/frontend-angular';
import { LedgerInfo, LedgerBlock, LedgerBlockTransaction } from '@hlf-explorer/common/ledger';
import { ITransportFabricTransaction } from '@ts-core/blockchain-fabric/transport/block';
import { FabricTransactionValidationCode } from '@ts-core/blockchain-fabric/api/IFabricTransaction';
import { PipeService } from '../../../../services/PipeService';
import { LedgerBlockTransactionWrapper } from '../../../../lib/ledger/LedgerBlockTransactionWrapper';
import * as _ from 'lodash';
import { TextHighlightUtil } from '../../../../lib/util/TextHighlightUtil';
import { ExtendedError } from '@ts-core/common/error';

@Component({
    selector: 'ledger-transaction',
    templateUrl: 'ledger-transaction.component.html'
})
export class LedgerTransactionComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _transaction: LedgerBlockTransaction;

    public name: string;
    public date: string;
    public isExecuted: boolean;

    public request: string;
    public requestUserId: string;

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
        
        value = this.pipe.momentDate.transform(transaction.createdDate);
        if (value !== this.date) {
            this.date = value;
        }

        value = transaction.requestName;
        if (value !== this.name) {
            this.name = value;
        }

        value = transaction.requestUserId;
        if (value !== this.requestUserId) {
            this.requestUserId = value;
        }

        value = transaction.requestData;
        if (value !== this.request) {
            this.request = value;
        }

        value = transaction.responseData;
        if (value !== this.response) {
            this.response = value;
        }

        value = transaction.isExecuted;
        if (value !== this.isExecuted) {
            this.isExecuted = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private parseJSON(data: any): string {
        if (_.isObject(data)) {
            data = JSON.stringify(data, null, 2);
            data = TextHighlightUtil.text(data);
            return data;
        } else {
            return TextHighlightUtil.text(data.toString());
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
