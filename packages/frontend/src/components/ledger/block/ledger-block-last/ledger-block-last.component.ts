import { Component, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerBlock } from '@hlf-explorer/common/ledger';
import { PipeService } from '../../../../services/PipeService';

@Component({
    selector: 'ledger-block-last',
    templateUrl: 'ledger-block-last.component.html'
})
export class LedgerBlockLastComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _block: LedgerBlock;

    public date: string;
    public number: string;
    public transactions: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, private pipe: PipeService) {
        super();
        ViewUtil.addClasses(element, 'd-flex flex-grow-1 align-items-center');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitBlockProperties(): void {
        let value = null;

        value = this.pipe.momentDateFromNow.transform(this.block.createdDate, null);
        if (value !== this.date) {
            this.date = value;
        }

        value = `# ${this.block.number}`;
        if (value !== this.number) {
            this.number = value;
        }

        value = this.block.transactions.length;
        if (value !== this.transactions) {
            this.transactions = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public get block(): LedgerBlock {
        return this._block;
    }
    @Input()
    public set block(value: LedgerBlock) {
        if (value === this._block) {
            return;
        }
        this._block = value;
        if (this._block) {
            this.commitBlockProperties();
        }
    }
}
