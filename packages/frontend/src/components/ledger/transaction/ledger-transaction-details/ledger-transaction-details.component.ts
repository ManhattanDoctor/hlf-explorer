import { Component, ViewContainerRef, Input } from '@angular/core';
import { ViewUtil, IWindowContent } from '@ts-core/frontend-angular';
import { LedgerBlockTransaction } from '@hlf-explorer/common/ledger';
import { TextHighlightUtil } from '../../../../lib/util/TextHighlightUtil';
import * as _ from 'lodash';
import { RouterService } from '../../../../services/RouterService';
import { PipeService } from '../../../../services/PipeService';
import { FabricTransactionValidationCode } from '@ts-core/blockchain-fabric/api/IFabricTransaction';
import { ExtendedError } from '@ts-core/common/error';
import { LedgerBlockTransactionWrapper } from '../../../../lib/ledger/LedgerBlockTransactionWrapper';

@Component({
    selector: 'ledger-transaction-details',
    templateUrl: 'ledger-transaction-details.component.html'
})
export class LedgerTransactionDetailsComponent extends IWindowContent {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public wrapper: LedgerBlockTransactionWrapper;

    public isValid: boolean;
    public validationCode: string;

    public response: string;
    public responseErrorMessage: string;

    public request: string;
    public requestUserId: string;
    public requestAlgorithm: string;

    private _transaction: LedgerBlockTransaction;

    private _mode: Mode;
    private _selectedIndex: number;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private pipe: PipeService, public router: RouterService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        let mode = this.router.getParam<Mode>('tab', Mode.DETAILS);
        this.mode = mode in Mode ? mode : Mode.DETAILS;
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitTransactionProperties(): void {
        let value = null;

        let transaction = this.wrapper = new LedgerBlockTransactionWrapper(this.transaction);

        value = transaction.requestData;
        if (value !== this.request) {
            this.request = value;
        }

        value = transaction.responseData;
        if (value !== this.response) {
            this.response = value;
        }

        value = this.pipe.language.translate(`block.transaction.validationCode.${transaction.validationCode}`);
        value += ` [ ${transaction.validationCode} ]`;
        if (value !== this.validationCode) {
            this.validationCode = value;
        }

        value = transaction.isValid;
        if (value !== this.isValid) {
            this.isValid = value;
        }

        value = transaction.requestAlgorithm;
        if (value !== this.requestAlgorithm) {
            this.requestAlgorithm = value;
        }

        value = transaction.requestUserId;
        if (value !== this.requestUserId) {
            this.requestUserId = value;
        }
        value = transaction.responseErrorMessage;
        if (value !== this.responseErrorMessage) {
            this.responseErrorMessage = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public get transaction(): LedgerBlockTransaction {
        return this._transaction;
    }

    @Input()
    public set transaction(value: LedgerBlockTransaction) {
        if (value === this._transaction) {
            return;
        }
        this._transaction = value;
        if (this._transaction) {
            this.commitTransactionProperties();
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    //--------------------------------------------------------------------------

    private get detailsIndex(): number {
        return 0;
    }
    private get requestIndex(): number {
        return 1;
    }
    private get responseIndex(): number {
        return 2;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get mode(): Mode {
        return this._mode;
    }

    @Input()
    public set mode(value: Mode) {
        if (value === this._mode) {
            return;
        }
        this._mode = value;
        this.router.setParam('tab', value);

        switch (value) {
            case 'details':
                this.selectedIndex = this.detailsIndex;
                break;
            case 'request':
                this.selectedIndex = this.requestIndex;
                break;
            case 'response':
                this.selectedIndex = this.responseIndex;
                break;
        }
    }

    public get selectedIndex(): number {
        return this._selectedIndex;
    }
    public set selectedIndex(value: number) {
        if (value === this._selectedIndex) {
            return;
        }
        this._selectedIndex = value;
        switch (value) {
            case this.detailsIndex:
                this.mode = Mode.DETAILS;
                break;
            case this.requestIndex:
                this.mode = Mode.REQUEST;
                break;
            case this.responseIndex:
                this.mode = Mode.RESPONSE;
                break;
        }
    }
}

enum Mode {
    DETAILS = 'details',
    REQUEST = 'request',
    RESPONSE = 'response'
}
