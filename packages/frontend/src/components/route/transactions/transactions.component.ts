import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerMonitorService } from '../../../services/LedgerMonitorService';
import { LedgerInfo } from '@hlf-explorer/common/ledger';
import { LedgerBlockMapCollection } from '../../../lib/ledger/LedgerBlockMapCollection';
import { LedgerService } from '../../../services/LedgerService';
import { LedgerBlockTransactionMapCollection } from '../../../lib/ledger/LedgerBlockTransactionMapCollection';

@Component({
    templateUrl: 'transactions.component.html'
})
export class TransactionsComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, public service: LedgerService) {
        super();
        ViewUtil.addClasses(element, 'd-block');

        if (!this.items.isDirty) {
            this.items.reload();
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get items(): LedgerBlockTransactionMapCollection {
        return this.service.transactions;
    }
}
