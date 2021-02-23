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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encurtador = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
let Encurtador = class Encurtador {
    get shortLink() {
        return `http://localhost:8081/{ $code }`;
    }
};
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Encurtador.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 2000 }),
    __metadata("design:type", String)
], Encurtador.prototype, "url", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Column({ length: 32, name: 'url_hash' }),
    __metadata("design:type", String)
], Encurtador.prototype, "urlHash", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Column({ length: 6 }),
    __metadata("design:type", String)
], Encurtador.prototype, "code", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], Encurtador.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({
        name: 'expires_at',
        default: () => `NOW() + INTERVAL '7 days'`,
        nullable: false,
    }),
    __metadata("design:type", Date)
], Encurtador.prototype, "expiresAt", void 0);
Encurtador = __decorate([
    typeorm_1.Entity('encurtador')
], Encurtador);
exports.Encurtador = Encurtador;
//# sourceMappingURL=encurtador.entity.js.map