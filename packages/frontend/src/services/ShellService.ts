export abstract class ShellService {
    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public abstract textOpen(text: string): void;

    public abstract blockOpen(ledgerId: number, height: number): Promise<void>;
}
