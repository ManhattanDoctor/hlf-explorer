import { Component, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import { Transport } from '@ts-core/common/transport';
import { LedgerMonitorService } from '../../../services/LedgerMonitorService';
import { RouterService } from '../../../services/RouterService';
import { SearchContainerBaseComponent } from '../SearchContainerBaseComponent';
import { ViewUtil } from '@ts-core/frontend-angular';

@Component({
    selector: 'search-container',
    templateUrl: 'search-container.component.html'
})
export class SearchContainerComponent extends SearchContainerBaseComponent {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public query: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, transport: Transport, router: RouterService, public monitor: LedgerMonitorService) {
        super(element, transport, router);
        ViewUtil.addClasses(element, 'd-flex background border rounded');
    }
}
