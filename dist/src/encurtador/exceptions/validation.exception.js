"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const common_1 = require("@nestjs/common");
class ValidationException extends common_1.BadRequestException {
    constructor(errors) {
        let messages = {};
        if (errors.length > 0) {
            messages = errors.reduce((mapped, error) => {
                mapped.errors[error.property] = Object.values(error.constraints);
                return mapped;
            }, { errors: {} });
        }
        super(messages);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map