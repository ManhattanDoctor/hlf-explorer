import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Resolve } from '@angular/router';
import { Transport } from '@ts-core/common/transport';
import * as _ from 'lodash';
import { LedgerInfo, LedgerBlock } from '@hlf-explorer/common/ledger';
import { RouterService } from '../RouterService';
import { TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import { ILedgerBlockGetResponse } from '@hlf-explorer/common/api/ledger/block';
import { TransformUtil } from '@ts-core/common/util';
import { WindowService } from '@ts-core/frontend-angular';

@Injectable({ providedIn: 'root' })
export class LedgerBlockResolver implements Resolve<LedgerBlock> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private transport: Transport, private router: RouterService, private windows: WindowService) {}

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<LedgerBlock> {
        let numberOrHash = route.params.numberOrHash;
        if (_.isNil(numberOrHash)) {
            let message = `Block number or hash ${numberOrHash} is invalid`;
            this.windows.info(message);
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(message);
        }

        try {
            let item = await this.transport.sendListen(
                new TransportHttpCommandAsync<ILedgerBlockGetResponse>('ledger/block', { data: { numberOrHash } })
            );
            return LedgerBlock.toClass(item.value);
        } catch (error) {
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(error.toString());
        }
    }
}
