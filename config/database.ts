import Env from '@ioc:Adonis/Core/Env'
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION', 'pg'),

  connections: {
    pg: {
      client: 'pg',
      connection: Env.get('DATABASE_URL')
        ? Env.get('DATABASE_URL')
        : {
            host: Env.get('PG_HOST', 'localhost'),
            port: Env.get('PG_PORT', 5432),
            user: Env.get('PG_USER', 'yuttapatnanakornpanom'),
            password: Env.get('PG_PASSWORD', ''),
            database: Env.get('PG_DB_NAME', 'todos_db'),
            ssl: Env.get('PG_SSL', 'false') === 'true' ? { rejectUnauthorized: false } : false,
          },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
