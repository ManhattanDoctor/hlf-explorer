import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { LoadableEvent } from '@ts-core/common';
import { Transport } from '@ts-core/common/transport';
import { TransportHttp, TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import {
    ApplicationComponent,
    LoginResolver,
    NotificationBaseComponent,
    NotificationComponent,
    NotificationFactory,
    NotificationService,
    PipeBaseService,
    QuestionComponent,
    RouterBaseService,
    UserBaseServiceEvent,
    ViewUtil,
    WindowBaseComponent,
    WindowFactory,
    WindowService
} from '@ts-core/frontend-angular';
import { Language, LanguageService } from '@ts-core/frontend/language';
import { LoadingService, LoadingServiceManager, NativeWindowService } from '@ts-core/frontend/service';
import { ThemeService } from '@ts-core/frontend/theme';
import { takeUntil } from 'rxjs/operators';
import { LedgerMonitorService } from '../../../services/LedgerMonitorService';
import { RouterService } from '../../../services/RouterService';
import { SettingsService } from '../../../services/SettingsService';
import { ShellService } from '../../../services/ShellService';
import * as _ from 'lodash';

@Component({
    selector: 'root',
    templateUrl: 'root.component.html',
    styleUrls: ['root.component.scss']
})
export class RootComponent extends ApplicationComponent<SettingsService> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        private windows: WindowService,
        private router: RouterBaseService,
        private shell: ShellService,
        private notifications: NotificationService,
        public loading: LoadingService,
        private pipe: PipeBaseService,
        private monitor: LedgerMonitorService,
        private nativeWindow: NativeWindowService,
        element: ElementRef,
        protected renderer: Renderer2,
        protected settings: SettingsService,
        protected language: LanguageService,
        protected theme: ThemeService,
        @Inject(Transport) protected transport: TransportHttp
    ) {
        super(element, 0);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected initialize(): void {
        this.windows.factory = new WindowFactory(WindowBaseComponent);
        this.windows.questionComponent = QuestionComponent;

        this.notifications.factory = new NotificationFactory(NotificationBaseComponent);
        this.notifications.questionComponent = NotificationComponent;

        super.initialize();

        ViewUtil.addClasses(this.element, 'h-100 d-block');
        this.initializeObservers();

        this.transport.settings.baseURL = this.settings.apiUrl;
        this.theme.loadIfExist(this.settings.theme);
        this.language.loadIfExist(this.settings.language);
    }

    private initializeObservers(): void {
        let manager = this.addDestroyable(new LoadingServiceManager(this.loading));
        manager.addLoadable(this.language);
        manager.addLoadable(this.transport);
        manager.addLoadable(this.monitor);

        this.transport.events.pipe(takeUntil(this.destroyed)).subscribe(data => {
            switch (data.type) {
                case LoadableEvent.ERROR:
                    this.apiLoadingError(data.data as TransportHttpCommandAsync<any>);
                    break;
            }
        });

        // User
        this.redirect();
    }

    private async redirect(): Promise<void> {}

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected async apiLoadingError<T>(command: TransportHttpCommandAsync<T>): Promise<void> {
        if (command.isHandleError) {
            this.windows.info(command.error.message);
        }
    }

    protected languageLoadingComplete(item: Language): void {
        this.transport.settings.headers.locale = item.locale;
        super.languageLoadingComplete(item);
    }

    protected languageLoadingError(item: Language, error: Error): void {
        let message = !_.isNil(error) ? error.message : `Unable to load language "${item.name}"`;
        this.router.navigate(`${RouterService.MESSAGE_URL}/${message}`);
    }

    protected readyHandler(): void {
        this.monitor.connect();
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected get config(): any {
        return this.nativeWindow.window['viConfig'];
    }

    protected get routerParams(): any {
        return this.router.getParams();
    }
}
