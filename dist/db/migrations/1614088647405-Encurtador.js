/* istanbul ignore file */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encurtador1614088647405 = void 0;
class Encurtador1614088647405 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "encurtador" (
        "id" INTEGER NOT NULL,
        "url" varchar(10) NOT NULL,
        "url_hash" char(32) NOT NULL,
        "code" char(6) NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "expires_at" timestamp NOT NULL,
        CONSTRAINT "UQ_0dd205d72e51c363d92533daa76" UNIQUE ("url_hash"),
        CONSTRAINT "UQ_ef0d46b769e81edccbab882f6c0" UNIQUE ("code"),
        CONSTRAINT "PK_3d52d95d7c1a30f54e5a3f6362c" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "encurtador"', undefined);
    }
}
exports.Encurtador1614088647405 = Encurtador1614088647405;
//# sourceMappingURL=1614088647405-Encurtador.js.map