const sql = require("mssql/msnodesqlv8");

const config = {
  user: "sa",
  password: "123456",
  database: "quanlybanhang",
  server: "localhost",
  driver: "msnodesqlv8",
  multipleStatements: true
};
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
  sql,
  poolPromise,
};
