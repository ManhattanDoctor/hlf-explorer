import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageBaseComponent } from '@ts-core/frontend-angular';
import { LanguageService } from '@ts-core/frontend/language';
import { RouterService } from '../../../services/RouterService';

@Component({
    templateUrl: 'message.component.html'
})
export class MessageComponent extends MessageBaseComponent {
    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(route: ActivatedRoute, language: LanguageService, private router: RouterService) {
        super(route, language);
    }

    //--------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    //--------------------------------------------------------------------------

    public refresh(): void {
        this.router.navigate('/');
    }
}
