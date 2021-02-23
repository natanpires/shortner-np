"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
exports.typeOrmConfig = {
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: ['dist/db/migrations/**/*.{js,ts}'],
    cli: {
        migrationsDir: 'db/migrations',
    },
    synchronize: true,
    ssl: { rejectUnauthorized: false },
};
//# sourceMappingURL=db.config.js.map