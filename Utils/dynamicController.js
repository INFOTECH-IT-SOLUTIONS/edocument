const { oracledb } = require("../Config/db");

// execute single query
module.exports.Execute = (QuertyString, object = {}) => {
  // console.log("QuertyString Execute :", QuertyString);
  return new Promise(async function (resolve, reject) {
    try {
      let connection = await oracledb.getConnection("EDOCUMENT");
      const result = await connection.execute(QuertyString, object);

      resolve(result.rows);
      await connection.close();
    } catch (err) {
      console.log("error", err);
      reject(err);
    }
  });
};
module.exports.ExecuteBind = (QueryString, binds = {}, options = {}) => {
  // console.log("QuertyString Execute :", QueryString);
  return new Promise(async (resolve, reject) => {
    let connection;

    try {
      connection = await oracledb.getConnection("EDOCUMENT");
      const result = await connection.execute(QueryString, binds, options);
      resolve(result); // Resolve the entire result object, not just rows
    } catch (err) {
      console.log("error", err);
      reject(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (closeErr) {
          console.log("Error closing the connection:", closeErr);
        }
      }
    }
  });
};
