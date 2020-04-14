import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef } from '@angular/core';
import {
    MenuItem,
    MenuItems,
    NavigationMenuItem,
    NotificationService,
    RouterBaseService,
    ShellBaseComponent,
    UserBaseServiceEvent,
    ViewUtil
} from '@ts-core/frontend-angular';
import { LanguageService } from '@ts-core/frontend/language';
import { ThemeService } from '@ts-core/frontend/theme';
import { filter, takeUntil } from 'rxjs/operators';
import { RouterService } from '../../../services/RouterService';
import { ShellService } from '../../../services/ShellService';

@Component({
    selector: 'shell',
    styleUrls: ['shell.component.scss'],
    templateUrl: 'shell.component.html'
})
export class ShellComponent extends ShellBaseComponent {
    //--------------------------------------------------------------------------
    //
    // 	Constants
    //
    //--------------------------------------------------------------------------

    private static DASHBOARD_INDEX = 0;
    private static BLOCKS_INDEX = 1;
    private static TRANSACTIONS_INDEX = 1;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        public language: LanguageService,
        public theme: ThemeService,
        private shell: ShellService,
        notifications: NotificationService,
        router: RouterBaseService,
        breakpointObserver: BreakpointObserver,
        element: ElementRef
    ) {
        super(router, notifications, breakpointObserver);
        ViewUtil.addClasses(element, 'd-block w-100 h-100');

        this.initialize();
    }

    protected initializeMenu(): void {
        this.menu = new MenuItems(this.language, null, true);
        this.menu.add(new NavigationMenuItem('tab.dashboard', ShellComponent.DASHBOARD_INDEX, 'fas fa-tachometer-alt', '/' + RouterService.DASHBOARD_URL));
        this.menu.add(new NavigationMenuItem('tab.blocks', ShellComponent.BLOCKS_INDEX, 'fas fa-tachometer-alt', '/' + RouterService.BLOCKS_URL));
        this.menu.add(new NavigationMenuItem('tab.transactions', ShellComponent.TRANSACTIONS_INDEX, 'fas fa-tachometer-alt', '/' + RouterService.TRANSACTIONS_URL));

        for (let item of this.menu.items) {
            if (item instanceof NavigationMenuItem) {
                item.select = item => this.router.navigate(item.url);
            }
        }

        this.menu.checkEnabled();
        this.addDestroyable(this.menu);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public navigateToDefault(): void {
        this.router.navigate(RouterService.DEFAULT_URL);
    }
}
