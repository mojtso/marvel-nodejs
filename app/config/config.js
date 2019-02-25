module.exports = {
    "development": {
      
    },
    "production": {
      "use_env_variable": process.env.DATABASE_URL,
      "dialect": "msql"
    }
  }