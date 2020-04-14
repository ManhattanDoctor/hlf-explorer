import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerMonitorService } from '../../../services/LedgerMonitorService';
import { LedgerInfo } from '@hlf-explorer/common/ledger';

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, public monitor: LedgerMonitorService) {
        super();
        ViewUtil.addClasses(element, 'd-block');
    }
}
