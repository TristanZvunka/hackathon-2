const AbstractManager = require("./AbstractManager");

class DataManager extends AbstractManager {
  constructor() {
    super({ table: "data" });
  }

  async create(mot, count) {
    const [result] = await this.database.query(
      `insert into ${this.table} (mot, count)
             values (?, ?)`,
      [mot, count]
    );

    return result.insertId;
  }

  async read(mot) {
    const [result] = await this.database.query(
      `select *
             from ${this.table}
             where mot = ?`,
      [mot]
    );
    return result;
  }

  async update(mot, count) {
    const [result] = await this.database.query(
      `update ${this.table}
             set count = ?
             where mot = ?`,
      [count, mot]
    );
    return result;
  }

  async readAll() {
    const [result] = await this.database.query(
      `select *
             from ${this.table}
             order by count desc`
    );
    return result;
  }

  async delete(mot) {
    const [result] = await this.database.query(
      `delete
             from ${this.table}
             where mot = ?`,
      [mot]
    );
    return result;
  }
}

module.exports = DataManager;
