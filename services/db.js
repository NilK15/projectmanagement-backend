// SQLite database connection used for this project
const sqlite3 = require('sqlite3').verbose();

// Connecting to SQLite3 database file
const db = new sqlite3.Database("./database/project.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

module.exports = db;
