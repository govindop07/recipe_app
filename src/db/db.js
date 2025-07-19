import mysql from 'mysql2/promise';

const pool =  mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "recipe_app",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
