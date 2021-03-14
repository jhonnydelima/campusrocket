const { Pool } = require("pg");

module.exports = new Pool({
    user: "jlima",
    password: "",
    host: "localhost",
    port: 5432,
    database: "my_teacher"
});