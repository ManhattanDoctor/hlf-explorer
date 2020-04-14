import { Injectable } from '@angular/core';
import { DestroyableContainer, LoadableEvent } from '@ts-core/common';
import { Transport } from '@ts-core/common/transport';
import { UserBaseServiceEvent } from '@ts-core/frontend-angular';
import { LanguageService } from '@ts-core/frontend/language';
import { LedgerBlockMapCollection } from '../lib/ledger/LedgerBlockMapCollection';
import { LedgerBlockTransactionMapCollection } from '../lib/ledger/LedgerBlockTransactionMapCollection';

@Injectable()
export class LedgerService extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _blocks: LedgerBlockMapCollection;
    private _transactions: LedgerBlockTransactionMapCollection;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private transport: Transport, language: LanguageService) {
        super();

        this._blocks = new LedgerBlockMapCollection(transport);
        this._transactions = new LedgerBlockTransactionMapCollection(transport);

        // Language
        if (language.isLoaded) {
            this.commitLanguageProperties();
        }
        language.events.subscribe(data => {
            if (data.type === LoadableEvent.COMPLETE) {
                this.commitLanguageProperties();
            }
        });
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitLanguageProperties(): void {}

    public get blocks(): LedgerBlockMapCollection {
        return this._blocks;
    }

    public get transactions(): LedgerBlockTransactionMapCollection {
        return this._transactions;
    }
}
