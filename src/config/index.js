const dotenv = require(`dotenv`)

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  port: parseInt(process.env.NODE_PORT, 10) || 4567,

  verifyToken: process.env.VERIFY_TOKEN,

  /**
   * API configs
   */
  api: {
    prefix: '/api',
    routeService: process.env.ROUTE_SERVICE
  },

  /**
   * Used by winston logger
   */
   logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  messageError: process.env.ERROR_MESSAGE,
  

  /**
   * Environment External Services
   */
  services: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: process.env.DB_DIALECT
    }

  }
}