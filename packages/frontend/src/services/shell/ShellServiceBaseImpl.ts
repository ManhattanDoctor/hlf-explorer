import { PromiseHandler } from '@ts-core/common/promise';
import { Transport } from '@ts-core/common/transport';
import { TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import { NotificationService, WindowConfig, WindowEvent, WindowService } from '@ts-core/frontend-angular';
import { LanguageService } from '@ts-core/frontend/language';
import { LedgerBlockDetailsComponent } from '../../components/ledger/block/ledger-block-details/ledger-block-details.component';
import { TextContainerComponent } from '../../components/common/text-container/text-container.component';
import { RouterService } from '../RouterService';
import { ShellService } from '../ShellService';
import { takeUntil } from 'rxjs/operators';
import { ILedgerBlockGetResponse } from '@hlf-explorer/common/api/ledger/block';

export class ShellServiceBaseImpl extends ShellService {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        protected transport: Transport,
        protected windows: WindowService,
        protected notifications: NotificationService,
        protected language: LanguageService,
        protected router: RouterService
    ) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async blockOpen(ledgerId: number, height: number): Promise<void> {
        let windowId = 'block' + ledgerId + height;
        if (this.windows.setOnTop(windowId)) {
            return;
        }

        let block = await this.transport.sendListen(
            new TransportHttpCommandAsync<ILedgerBlockGetResponse>('ledger/block', { data: { ledgerId, blockHeightOrHash: height } })
        );
  
        let config = new WindowConfig(false, true, 800, 600);
        config.id = windowId;
        config.propertiesId = 'blockOpen';

        let content = this.windows.open(LedgerBlockDetailsComponent, config) as LedgerBlockDetailsComponent;
        content.block = block.value;
    }

    public textOpen(text: string): void {
        let windowId = 'textOpen' + text;
        if (this.windows.setOnTop(windowId)) {
            return;
        }

        let config = new WindowConfig(false, true, 800, 600);
        config.id = windowId;
        config.propertiesId = 'textOpen';

        let content = this.windows.open(TextContainerComponent, config) as TextContainerComponent;
        content.text = text;
    }
}
