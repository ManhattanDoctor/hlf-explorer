import { Injectable } from '@angular/core';
import { CookieService } from '@ts-core/frontend-angular';
import { SettingsBaseService } from '@ts-core/frontend/service';

@Injectable()
export class SettingsService extends SettingsBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private cookies: CookieService) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected getParamsFromCookies(): any {
        let param = {} as any;
        let value = null;

        value = this.cookies.get('apiUrl');
        if (value) {
            // param.apiUrl = value;
        }
        return param;
    }

    protected setParamsToCookies(): any {
        if (this.apiUrl) {
            // this.cookies.put('apiUrl', this.apiUrl);
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public get publicKey(): string {
        return this.getValue('publicKey');
    }

    public get socketUrl(): string {
        return this.getValue('socketUrl');
    }
}
