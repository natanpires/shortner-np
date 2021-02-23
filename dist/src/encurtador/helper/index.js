"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlHasher = void 0;
const md5 = require("md5");
const URI = require("uri-js");
class UrlHasher {
    constructor(url) {
        this.url = url;
    }
    get hash() {
        return md5(this.normalizedUrl);
    }
    get normalizedUrl() {
        const uri = URI.parse(this.url);
        if (uri.query) {
            uri.query = this.reorderQueryParams(uri.query);
        }
        return URI.normalize(URI.serialize(uri));
    }
    reorderQueryParams(params) {
        return params
            .split('&')
            .sort((a, b) => {
            const ax = a.split('=');
            const bx = b.split('=');
            if (ax[0] > bx[0]) {
                return 1;
            }
            if (ax[0] < bx[0]) {
                return -1;
            }
            return 0;
        })
            .join('&');
    }
}
exports.UrlHasher = UrlHasher;
//# sourceMappingURL=index.js.map