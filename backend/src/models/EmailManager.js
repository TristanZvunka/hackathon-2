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

    return result.insertId;
  }
}

module.exports = EmailManager;
