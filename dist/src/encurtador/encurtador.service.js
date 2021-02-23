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
exports.EncurtadorService = void 0;
const short_unique_id_1 = require("short-unique-id");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const encurtador_entity_1 = require("./encurtador.entity");
const helper_1 = require("./helper");
const show_dto_1 = require("./dto/show.dto");
let EncurtadorService = class EncurtadorService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const hasher = new helper_1.UrlHasher(dto.longUrl);
        const existing = await this.repo.findOne({ urlHash: hasher.hash });
        if (existing) {
            if (new Date() > existing.expiresAt) {
                await this.repo.delete({ code: existing.code });
            }
            else {
                const ret = new show_dto_1.ShowDto();
                ret.url = existing.url;
                ret.newUrl = `${process.env.HOST}/${existing.code}`;
                return ret;
            }
        }
        const link = this.repo.create({
            url: dto.longUrl,
            urlHash: hasher.hash,
            code: new short_unique_id_1.default().randomUUID(6),
        });
        await this.repo.save(link);
        const obj = new show_dto_1.ShowDto();
        obj.url = link.url;
        obj.newUrl = `${process.env.HOST}/${link.code}`;
        return obj;
    }
    async find(code) {
        const existing = await this.repo.findOne({ code });
        if (existing) {
            const ret = new show_dto_1.ShowDto();
            ret.url = existing.url;
            return ret;
        }
        throw new common_1.HttpException('Shortened url not found.', common_1.HttpStatus.NOT_FOUND);
    }
};
EncurtadorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(encurtador_entity_1.Encurtador)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EncurtadorService);
exports.EncurtadorService = EncurtadorService;
//# sourceMappingURL=encurtador.service.js.map