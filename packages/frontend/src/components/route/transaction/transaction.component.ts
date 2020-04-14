import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerMonitorService } from '../../../services/LedgerMonitorService';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { LedgerBlock, LedgerBlockTransaction } from '@hlf-explorer/common/ledger';

@Component({
    templateUrl: 'transaction.component.html'
})
export class TransactionComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, private route: ActivatedRoute) {
        super();

        ViewUtil.addClasses(element, 'd-block');
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get transaction(): LedgerBlockTransaction {
        return this.route.snapshot.data.transaction;
    }
}
