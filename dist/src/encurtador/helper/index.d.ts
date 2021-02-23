export declare class UrlHasher {
    private url;
    constructor(url: string);
    get hash(): string;
    get normalizedUrl(): string;
    private reorderQueryParams;
}
