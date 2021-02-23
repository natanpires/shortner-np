"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const typeOrmConfig = () => ({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path_1.join(__dirname, '../**/**/*entity{.ts,.js}')],
    autoLoadEntities: true,
    migrations: ['dist/db/migrations/**/*.{js,ts}'],
    cli: {
        migrationsDir: 'db/migrations',
    },
    synchronize: true,
    ssl: { rejectUnauthorized: false },
});
exports.default = typeOrmConfig;
//# sourceMappingURL=db.config.js.map