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
exports.EncurtadorController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const encurtador_service_1 = require("./encurtador.service");
const create_dto_1 = require("./dto/create.dto");
let EncurtadorController = class EncurtadorController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return this.service.create(dto);
    }
    async get(code) {
        return this.service.find(code);
    }
};
__decorate([
    common_2.Post('/encurtador'),
    common_1.Header('Content-Type', 'application/json'),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDto]),
    __metadata("design:returntype", Promise)
], EncurtadorController.prototype, "create", null);
__decorate([
    common_1.Get(':code'),
    __param(0, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EncurtadorController.prototype, "get", null);
EncurtadorController = __decorate([
    common_2.Controller(),
    __metadata("design:paramtypes", [encurtador_service_1.EncurtadorService])
], EncurtadorController);
exports.EncurtadorController = EncurtadorController;
//# sourceMappingURL=encurtador.controller.js.map