const AbstractManager = require("./AbstractManager");

class EmailManager extends AbstractManager {
  constructor() {
    super({ table: "email" });
  }

  async create(email) {
    const [result] = await this.database.query(
      `insert into ${this.table} (email) values (?)`,
      [email]
    );

    return result;
  }

  async read(email) {
    const [result] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    return result;
  }
}

module.exports = EmailManager;
