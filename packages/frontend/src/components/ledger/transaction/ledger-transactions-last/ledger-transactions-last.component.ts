import { Component, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerInfo } from '@hlf-explorer/common/ledger';
import { RouterService } from '../../../../services/RouterService';

@Component({
    selector: 'ledger-transactions-last',
    templateUrl: 'ledger-transactions-last.component.html'
})
export class LedgerTransactionsLastComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _ledger: LedgerInfo;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, public router: RouterService) {
        super();
        ViewUtil.addClasses(element, 'd-block');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitLedgerProperties(): void {}

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get ledger(): LedgerInfo {
        return this._ledger;
    }

    @Input()
    public set ledger(value: LedgerInfo) {
        if (value === this._ledger) {
            return;
        }
        this._ledger = value;

        if (this._ledger) {
            this.commitLedgerProperties();
        }
    }
}
