import { MapCollection } from '@ts-core/common/map';
import { LedgerBlock } from './LedgerBlock';
import { Exclude } from 'class-transformer';
import * as _ from 'lodash';
import { LedgerBlockTransaction } from './LedgerBlockTransaction';

export class LedgerBlocksLast extends MapCollection<LedgerBlock> {
    // --------------------------------------------------------------------------
    //
    //  Constants
    //
    // --------------------------------------------------------------------------

    public static MAX_LENGTH = 10;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(items?: Array<LedgerBlock>) {
        super('hash', LedgerBlocksLast.MAX_LENGTH);

        if (!_.isEmpty(items)) {
            this.addItems(items);
            this.collection.sort(this.sortFunction);
        }
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    private sortFunction = (first: LedgerBlock, second: LedgerBlock): number => {
        return first.number > second.number ? -1 : 1;
    };
}
