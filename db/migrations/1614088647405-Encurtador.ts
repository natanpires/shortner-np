import { MigrationInterface, QueryRunner } from 'typeorm';

export class Encurtador1614088647405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "encurtador" (
        "id" SERIAL,
        "url" TEXT NOT NULL,
        "url_hash" char(32) NOT NULL,
        "code" char(6) NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "expires_at" timestamp NOT NULL DEFAULT NOW() + INTERVAL '7 days',
        CONSTRAINT "UQ_0dd205d72e51c363d92533daa76" UNIQUE ("url_hash"),
        CONSTRAINT "UQ_ef0d46b769e81edccbab882f6c0" UNIQUE ("code"),
        CONSTRAINT "PK_3d52d95d7c1a30f54e5a3f6362c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE "encurtador"', undefined);
  }
}
