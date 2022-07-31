const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database("./database/test.db", sqlite3.OPEN_READWRITE, (err) => {

    if (err) return console.error(err.message);
});
// const db = new sqlite3.Database('./test.db');

return module.exports = db;
