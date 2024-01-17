const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(email, hashedPassword) {
    const [result] = await this.database.query(
      `insert into ${this.table} (email, password)
             values (?, ?)`,
      [email, hashedPassword]
    );

    return result;
  }

  async readAll() {
    const [rows] = await this.database.query(`select *
                                                  from ${this.table}`);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select *
             from ${this.table}
             where id = ?`,
      [id]
    );

    return rows[0];
  }

  async checkEmail(email) {
    const [rows] = await this.database.query(
      `select *
             from ${this.table}
             where email = ?`,
      [email]
    );

    return rows;
  }
}

module.exports = UserManager;
