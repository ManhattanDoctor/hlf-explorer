import { Component, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { RouterService } from '../../../../services/RouterService';
import { LedgerBlockTransactionMapCollection } from '../../../../lib/ledger/LedgerBlockTransactionMapCollection';

@Component({
    selector: 'ledger-transactions',
    templateUrl: 'ledger-transactions.component.html'
})
export class LedgerTransactionsComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public transactions: LedgerBlockTransactionMapCollection;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, public router: RouterService) {
        super();
        ViewUtil.addClasses(element, 'd-block');
    }
}
