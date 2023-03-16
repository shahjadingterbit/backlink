const Sequelize = require("sequelize");
const dbConfig = {
  HOST: process.env.MYSQL_HOST,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_MASTER_DB,
  dialect: "mysql",
  pool: {
    max: 700,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  port:process.env.MYSQL_PORT,
};
let sequelize = null;
exports.Connect = async () => {
  if (sequelize === null) {
    sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      operatorsAliases: 0,
      logging: true,
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
      port: dbConfig.port,
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log(`Connection to database ${dbConfig.DB} successfull`);
      })
      .catch((err) => {
        console.log(`Unable to connect to the database ${dbConfig.DB}`, err);
      });
  }

  return sequelize;
};
