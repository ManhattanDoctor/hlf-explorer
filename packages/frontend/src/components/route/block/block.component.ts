import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerMonitorService } from '../../../services/LedgerMonitorService';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { LedgerBlock } from '@hlf-explorer/common/ledger';

@Component({
    templateUrl: 'block.component.html'
})
export class BlockComponent extends DestroyableContainer {
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

    public get block(): LedgerBlock {
        return this.route.snapshot.data.block;
    }
}
