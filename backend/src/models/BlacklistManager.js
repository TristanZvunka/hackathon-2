const AbstractManager = require("./AbstractManager");

class BlacklistManager extends AbstractManager {
  constructor() {
    super({ table: "blacklist" });
  }

  async read(mot) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where mot = ?`,
      [mot]
    );

    return rows[0];
  }
}

module.exports = BlacklistManager;
