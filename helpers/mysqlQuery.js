const selectMysqlGet = async (mysqldb, query) => {
  const result = await mysqldb.query(query, {
    type: mysqldb.Sequelize.QueryTypes.SELECT,
  });
  if (result.length > 0) {
    return result[0];
  }
  return result;
};

const selectMysqlAll = async (mysqldb, query) => {
  const result = await mysqldb.query(query, {
    type: mysqldb.Sequelize.QueryTypes.SELECT,
  });
  return result;
};

const insertMysqlSingle = async (mysqldb, query) => {
  const result = await mysqldb.query(query, {
    type: mysqldb.Sequelize.QueryTypes.INSERT,
  });

  return result;
};

const updateMysqlSingle = async (mysqldb, query) => {
  const result = await mysqldb.query(query, {
    type: mysqldb.Sequelize.QueryTypes.INSERT,
  });

  return result;
};

module.exports = {
  selectMysqlGet,
  selectMysqlAll,
  insertMysqlSingle,
  updateMysqlSingle,
};
