import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterBaseService } from '@ts-core/frontend-angular';
import { NativeWindowService } from '@ts-core/frontend/service';
import { LedgerBlock, LedgerBlockTransaction } from '@hlf-explorer/common/ledger';
import * as _ from 'lodash';

@Injectable()
export class RouterService extends RouterBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    public static BLOCK_URL = 'block';
    public static BLOCKS_URL = 'blocks';

    public static TRANSACTION_URL = 'transaction';
    public static TRANSACTIONS_URL = 'transactions';

    public static DASHBOARD_URL = 'dashboard';
    public static MESSAGE_URL = 'message';

    public static DEFAULT_URL = RouterService.DASHBOARD_URL;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(router: Router, nativeWindow: NativeWindowService) {
        super(router, nativeWindow);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public blockOpen(item: LedgerBlock | number): void {
        let value = _.isNumber(item) ? item : item.number;
        this.navigate(`${RouterService.BLOCK_URL}/${value}`);
    }

    public blocksOpen(): void {
        this.navigate(`${RouterService.BLOCKS_URL}`);
    }

    public transactionOpen(item: LedgerBlockTransaction | string): void {
        let value = _.isString(item) ? item : item.requestId || item.hash;
        this.navigate(`${RouterService.TRANSACTION_URL}/${value}`);
    }

    public transactionsOpen(): void {
        this.navigate(`${RouterService.TRANSACTIONS_URL}`);
    }
}
