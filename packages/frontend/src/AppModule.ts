import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTabsModule,
    MAT_LABEL_GLOBAL_OPTIONS
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ILogger, Logger } from '@ts-core/common/logger';
import { Transport } from '@ts-core/common/transport';
import { TransportHttp } from '@ts-core/common/transport/http';
import { DateUtil } from '@ts-core/common/util';
import {
    APPLICATION_INJECTOR,
    LanguageResolver,
    PipeBaseService,
    RouterBaseService,
    UserBaseService,
    VICommonModule,
    VIComponentModule
} from '@ts-core/frontend-angular';
import { SettingsBaseService } from '@ts-core/frontend/service';
import { TextContainerComponent } from './components/common/text-container/text-container.component';
import { SearchContainerComponent } from './components/common/search-container/search-container.component';
import { BlockComponent } from './components/route/block/block.component';
import { TransactionComponent } from './components/route/transaction/transaction.component';
import { BlocksComponent } from './components/route/blocks/blocks.component';
import { TransactionsComponent } from './components/route/transactions/transactions.component';
import { DashboardComponent } from './components/route/dashboard/dashboard.component';
import { RootComponent } from './components/route/root/root.component';
import { ShellComponent } from './components/route/shell/shell.component';
import { MessageComponent } from './components/route/message/message.component';
import { LedgerBlocksLastComponent } from './components/ledger/block/ledger-blocks-last/ledger-blocks-last.component';
import { LedgerTransactionsComponent } from './components/ledger/transaction/ledger-transactions/ledger-transactions.component';
import { LedgerTransactionsLastComponent } from './components/ledger/transaction/ledger-transactions-last/ledger-transactions-last.component';
import { LedgerTransactionComponent } from './components/ledger/transaction/ledger-transaction/ledger-transaction.component';
import { LedgerTransactionDetailsComponent } from './components/ledger/transaction/ledger-transaction-details/ledger-transaction-details.component';
import { LedgerTransactionLastComponent } from './components/ledger/transaction/ledger-transaction-last/ledger-transaction-last.component';
import { LedgerBlockLastComponent } from './components/ledger/block/ledger-block-last/ledger-block-last.component';
import { LedgerBlocksComponent } from './components/ledger/block/ledger-blocks/ledger-blocks.component';
import { LedgerMonitorService } from './services/LedgerMonitorService';
import { LedgerService } from './services/LedgerService';
import { PipeService } from './services/PipeService';
import { RouterService } from './services/RouterService';
import { SettingsService } from './services/SettingsService';
import { PrettifyPipe } from './services/pipe/PrettifyPipe';
import { LedgerBlockResolver } from './services/guard/LedgerBlockResolver';
import { LedgerMonitorResolver } from './services/guard/LedgerMonitorResolver';
import { LedgerBlockTransactionResolver } from './services/guard/LedgerBlockTransactionResolver';
import { ShellServiceImpl } from './services/shell/ShellServiceImpl';
import { ShellService } from './services/ShellService';
import { LedgerBlockDetailsComponent } from './components/ledger/block/ledger-block-details/ledger-block-details.component';

export const imports: any[] = [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    // Mat
    MatMenuModule,
    MatTabsModule,
    MatListModule,
    MatBadgeModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatProgressBarModule,

    // Vi
    VIComponentModule,
    VICommonModule.forRoot({ languageOptions: { name: 'coin-monitor-language' }, themeOptions: { name: 'coin-monitor-theme' } }),

    // Router
    RouterModule.forRoot([
        {
            path: '',
            resolve: {
                language: LanguageResolver,
                socket: LedgerMonitorResolver
            },
            component: ShellComponent,
            children: [
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: RouterService.DEFAULT_URL
                },
                {
                    path: RouterService.DASHBOARD_URL,
                    component: DashboardComponent
                },
                {
                    path: RouterService.BLOCKS_URL,
                    component: BlocksComponent
                },
                {
                    path: RouterService.TRANSACTIONS_URL,
                    component: TransactionsComponent
                },
                {
                    path: `${RouterService.BLOCK_URL}/:numberOrHash`,
                    resolve: {
                        block: LedgerBlockResolver
                    },
                    component: BlockComponent
                },
                {
                    path: `${RouterService.TRANSACTION_URL}/:hashOrUid`,
                    resolve: {
                        transaction: LedgerBlockTransactionResolver
                    },
                    component: TransactionComponent
                }
            ]
        },
        {
            path: `${RouterService.MESSAGE_URL}/:message`,
            component: MessageComponent
        }
    ])
];

export const providers: any[] = [
    PipeService,
    RouterService,
    LedgerService,
    SettingsService,

    LedgerBlockResolver,
    LedgerMonitorResolver,

    LedgerMonitorService,

    {
        provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
        useValue: {
            showDelay: DateUtil.MILISECONDS_SECOND / 2,
            hideDelay: DateUtil.MILISECONDS_SECOND / 2,
            touchendHideDelay: DateUtil.MILISECONDS_SECOND / 2
        }
    },
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } },

    {
        provide: TransportHttp,
        deps: [Logger],
        useFactory: transportServiceFactory
    },

    { provide: Transport, useExisting: TransportHttp },
    { provide: ShellService, useClass: ShellServiceImpl },
    { provide: PipeBaseService, useExisting: PipeService },
    { provide: RouterBaseService, useExisting: RouterService },
    { provide: SettingsBaseService, useClass: SettingsService }
];

export const declarations: Array<any> = [
    PrettifyPipe,

    RootComponent,
    BlockComponent,
    ShellComponent,
    BlocksComponent,
    MessageComponent,
    DashboardComponent,
    TransactionComponent,
    TransactionsComponent,
    TextContainerComponent,

    SearchContainerComponent,

    LedgerTransactionComponent,
    LedgerTransactionsComponent,
    LedgerTransactionLastComponent,
    LedgerTransactionsLastComponent,
    LedgerTransactionDetailsComponent,

    LedgerBlocksComponent,
    LedgerBlockLastComponent,
    LedgerBlocksLastComponent,
    LedgerBlockDetailsComponent
];

export const entryComponents: any[] = [RootComponent, TextContainerComponent, LedgerBlockDetailsComponent];

registerLocaleData(localeRu);
registerLocaleData(localeEn);

@NgModule({
    entryComponents,
    declarations,
    providers,
    imports
})
export class AppModule {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private injector: Injector) {}

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public ngDoBootstrap(applicationRef: ApplicationRef): void {
        APPLICATION_INJECTOR(this.injector);
        applicationRef.bootstrap(RootComponent);
    }
}

export function transportServiceFactory(logger: ILogger): Transport {
    return new TransportHttp(logger, { method: 'get', headers: {}, isHandleLoading: true, isHandleError: true });
}
