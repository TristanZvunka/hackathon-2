/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

const EmailManager = require("./models/EmailManager");
const DataManager = require("./models/DataManager");
const BlacklistManager = require("./models/BlacklistManager");
const UserManager = require("./models/UserManager");
const RequestManager = require("./models/RequestManager");

const managers = [
  UserManager,
  BlacklistManager,
  DataManager,
  EmailManager,
  RequestManager,
];

const tables = {};
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  tables[manager.table] = manager;
});

/* ************************************************************************* */

module.exports = new Proxy(tables, {
  get(obj, prop) {
    if (prop in obj) return obj[prop];

    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
