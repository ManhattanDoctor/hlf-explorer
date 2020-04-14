import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common/transport';
import { NotificationService, WindowService } from '@ts-core/frontend-angular';
import { LanguageService } from '@ts-core/frontend/language';
import { RouterService } from '../RouterService';
import { ShellServiceBaseImpl } from './ShellServiceBaseImpl';

@Injectable()
export class ShellServiceImpl extends ShellServiceBaseImpl {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        transport: Transport,
        windows: WindowService,
        notifications: NotificationService,
        language: LanguageService,
        router: RouterService
    ) {
        super(transport, windows, notifications, language, router);
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------
}
