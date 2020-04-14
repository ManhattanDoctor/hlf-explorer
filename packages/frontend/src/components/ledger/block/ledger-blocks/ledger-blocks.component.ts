import { Component, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { RouterService } from '../../../../services/RouterService';
import { LedgerBlockMapCollection } from '../../../../lib/ledger/LedgerBlockMapCollection';

@Component({
    selector: 'ledger-blocks',
    templateUrl: 'ledger-blocks.component.html'
})
export class LedgerBlocksComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public blocks: LedgerBlockMapCollection;

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
