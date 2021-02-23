"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncurtadorMiddleware = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const encurtador_entity_1 = require("./encurtador.entity");
let EncurtadorMiddleware = class EncurtadorMiddleware {
    constructor(repo) {
        this.repo = repo;
    }
    async use(req, _res, next) {
        var _a;
        if (req.body.longUrl && req.body.longUrl.length < 1) {
            throw new common_1.HttpException('Request body invalid.', common_1.HttpStatus.BAD_REQUEST);
        }
        const existing = await this.repo.findOne({ code: (_a = req.params) === null || _a === void 0 ? void 0 : _a.code });
        if (existing && new Date() > (existing === null || existing === void 0 ? void 0 : existing.expiresAt)) {
            await this.repo.delete({ code: existing.code });
            throw new common_1.HttpException('Shortened url expired.', common_1.HttpStatus.NOT_FOUND);
        }
        next();
    }
};
EncurtadorMiddleware = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(encurtador_entity_1.Encurtador)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EncurtadorMiddleware);
exports.EncurtadorMiddleware = EncurtadorMiddleware;
//# sourceMappingURL=encurtador.middleware.js.map