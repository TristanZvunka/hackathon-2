const AbstractManager = require("./AbstractManager");

class RequestManager extends AbstractManager {
  constructor() {
    super({ table: "request" });
  }

  async create(counter) {
    const [result] = await this.database.query(
      `insert into ${this.table} (count) values (?)`,
      [counter]
    );

    return result;
  }

  async update(counter) {
    const [result] = await this.database.query(
      `update ${this.table}
             set count = ? where id = ?`,
      [counter, 1]
    );
    return result;
  }

  async readAll() {
    const [result] = await this.database.query(`select * from ${this.table}`);

    return result;
  }
}

module.exports = RequestManager;
