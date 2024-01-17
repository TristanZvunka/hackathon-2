const AbstractManager = require("./AbstractManager");

class BlacklistManager extends AbstractManager {
  constructor() {
    super({ table: "blacklist" });
  }

  async read(mot) {
    const [rows] = await this.database.query(
      `select *
             from ${this.table}
             where mot = ?`,
      [mot]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select *
             from ${this.table}`
    );

    return rows;
  }

  async create(mot) {
    const [result] = await this.database.query(
      `insert into ${this.table} (mot)
             values (?)`,
      [mot]
    );

    return result.insertId;
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

module.exports = BlacklistManager;
