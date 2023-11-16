import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nisioana1448",
    database: "databaseempresa",

});
