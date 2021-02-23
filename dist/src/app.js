"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const validation_exception_1 = require("./encurtador/exceptions/validation.exception");
const application = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (errors) => new validation_exception_1.ValidationException(errors),
    }));
    return app;
};
exports.application = application;
//# sourceMappingURL=app.js.map