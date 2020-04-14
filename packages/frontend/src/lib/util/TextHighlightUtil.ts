export class TextHighlightUtil {
    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    public static text(data: string): string {
        hljs.configure({ useBR: true, tabReplace: '    ' });

        let value = hljs.highlight('json', data);
        return hljs.fixMarkup(value.value);
    }
}

declare let hljs;
