import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: <string>process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: <string>process.env.DB_USER,
  password: <string>process.env.DB_PASSWORD,
  database: <string>process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['dist/db/migrations/**/*.{js,ts}'],
  cli: {
    migrationsDir: 'db/migrations',
  },
  synchronize: true,
};
