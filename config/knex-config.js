const config = {
  client: process.env.DB_CLIENT || 'pg',
  connection: {
    charset: process.env.DB_CHARSET || 'utf8',
    database: process.env.DB_DATABASE || 'serverapp',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'postgres',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER || 'postgres',
  },
  migrations: {
    tableName: 'migrations',
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
  debug: false,
};

module.exports = config;
