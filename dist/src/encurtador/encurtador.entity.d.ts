export declare class Encurtador {
    id: number;
    url: string;
    urlHash: string;
    code: string;
    createdAt: Date;
    expiresAt: Date;
    get shortLink(): string;
}
