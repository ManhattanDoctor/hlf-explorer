import { LedgerBlockTransaction } from '@hlf-explorer/common/ledger';
import * as _ from 'lodash';
import { ObjectUtil, TransformUtil } from '@ts-core/common/util';
import { ExtendedError } from '@ts-core/common/error';
import { TextHighlightUtil } from '../util/TextHighlightUtil';

export class LedgerBlockTransactionWrapper extends LedgerBlockTransaction {
    // --------------------------------------------------------------------------
    //
    //  Propertes
    //
    // --------------------------------------------------------------------------

    constructor(item: LedgerBlockTransaction) {
        super();
        ObjectUtil.copyProperties(item, this);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    private parseJSON(data: any): string {
        if (_.isObject(data)) {
            data = JSON.stringify(data, null, 2);
            data = TextHighlightUtil.text(data);
            return data;
        } else {
            return TextHighlightUtil.text(data.toString());
        }
    }

    // --------------------------------------------------------------------------
    //
    //  Public Propertes
    //
    // --------------------------------------------------------------------------

    public get isValid(): boolean {
        return this.validationCode === 0;
    }

    public get isError(): boolean {
        return !_.isNil(this.responseErrorCode);
    }

    public get isExecuted(): boolean {
        return this.isValid && !this.isError;
    }

    public get requestData(): any {
        return !_.isNil(this.request) ? this.parseJSON(this.request.request) : null;
    }

    public get requestAlgorithm(): any {
        return !_.isNil(this.request) ? this.request.algorithm : null;
    }

    public get responseData(): any {
        return !_.isNil(this.response) ? this.parseJSON(this.response.response) : null;
    }

    public get responseErrorMessage(): string {
        if (_.isNil(this.response) || !ExtendedError.instanceOf(this.response.response)) {
            return null;
        }
        let item = this.response.response;
        let value = `${item.message}: code ${item.code}`;
        if(ObjectUtil.isJSON(item.details))
        {
            value += `\n${this.parseJSON(JSON.parse(item.details))}`;
        }
        console.log();
        return value;;
    }
}
