module.exports = {
  type: process.env.DB_CONNECTION as 'postgres',
  host: <string>process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: <string>process.env.DB_USER,
  password: <string>process.env.DB_PASSWORD,
  database: <string>process.env.DB_NAME,
  autoLoadEntities: true,
  migrations: ['dist/db/migrations/**/*.{js,ts}'],
  cli: {
    migrationsDir: 'db/migrations',
  },
  synchronize: false,
  // Uncomment the following line to use with production db.
  // ssl: { rejectUnauthorized: false },
};
