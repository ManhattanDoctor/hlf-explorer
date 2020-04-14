import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerService } from '../../../services/LedgerService';
import { LedgerInfo } from '@hlf-explorer/common/ledger';
import { LedgerBlockMapCollection } from '../../../lib/ledger/LedgerBlockMapCollection';
import { LedgerMonitorService } from '../../../services/LedgerMonitorService';

@Component({
    templateUrl: 'blocks.component.html'
})
export class BlocksComponent extends DestroyableContainer {
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

    public get items(): LedgerBlockMapCollection {
        return this.service.blocks;
    }
}
