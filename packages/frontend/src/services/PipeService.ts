import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '@ts-core/frontend/language';
import { PipeBaseService } from '@ts-core/frontend-angular';
import { PrettifyPipe } from './pipe/PrettifyPipe';

@Injectable()
export class PipeService extends PipeBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Constants
    //
    //--------------------------------------------------------------------------

    private static PRETTIFY_PIPE: PrettifyPipe;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(language: LanguageService, sanitizer: DomSanitizer) {
        super(language, sanitizer);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get prettifyPipe(): PrettifyPipe {
        if (!PipeService.PRETTIFY_PIPE) {
            PipeService.PRETTIFY_PIPE = new PrettifyPipe();
        }
        return PipeService.PRETTIFY_PIPE;
    }
}
