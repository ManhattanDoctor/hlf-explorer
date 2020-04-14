import { IDestroyable } from '@ts-core/common';
import { IUser } from '@ts-core/frontend-angular';
import { Observable, Subject } from 'rxjs';

export class User implements IUser, IDestroyable {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public id: number;
    public login: string;
    private observer: Subject<string>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        this.observer = new Subject();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public update(data: any): void {
        if (data.hasOwnProperty('id')) {
            this.id = data.id.toString();
        }

        if (data.hasOwnProperty('account')) {
            this.observer.next(UserEvent.ACCOUNT_CHANGED);
        }
        if (data.hasOwnProperty('preferences')) {
            this.observer.next(UserEvent.PREFERENCES_CHANGED);
        }
        if (data.hasOwnProperty('isTwoFAEnabled')) {
            this.observer.next(UserEvent.IS_TWO_FA_ENABLED_CHANGED);
        }

        this.observer.next(UserEvent.CHANGED);
    }

    public serialize(): User {
        let item = {} as any;
        item.id = this.id;
        item.login = this.login;
        return item;
    }

    public destroy(): void {
        this.observer = null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get events(): Observable<string> {
        return this.observer.asObservable();
    }
}

export enum UserEvent {
    CHANGED = 'CHANGED',
    ACCOUNT_CHANGED = 'ACCOUNT_CHANGED',
    PREFERENCES_CHANGED = 'PREFERENCES_CHANGED',
    IS_TWO_FA_ENABLED_CHANGED = 'IS_TWO_FA_ENABLED_CHANGED'
}
