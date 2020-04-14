import { PaginableDataSourceMapCollection } from '@ts-core/common/map/dataSource';
import { LedgerBlock } from '@hlf-explorer/common/ledger';
import { Transport } from '@ts-core/common/transport';
import { IPagination } from '@ts-core/common/dto';
import { TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import { TransformUtil } from '@ts-core/common/util';

export class LedgerBlockMapCollection extends PaginableDataSourceMapCollection<LedgerBlock, any> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private transport: Transport) {
        super(`hash`);
        this.sort.number = false;
        this.isClearAfterLoad = true;
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitPageIndexProperties(): void {
        this._isAllLoaded = false;
        this.load();
    }

    protected request(): Promise<IPagination<any>> {
        return this.transport.sendListen(new TransportHttpCommandAsync(`ledger/blocks`, { data: this.createRequestData() }));
    }

    protected parseItem(item: any): LedgerBlock {
        return LedgerBlock.toClass(item);
    }
}
