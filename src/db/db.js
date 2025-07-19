import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "2401:4900:883f:9ba3:bd55:3f3a:e7e8:d03e",
  user: "recipe_admin",
  password: process.env.DATABASE_PASSWORD,
  database: "recipe_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export default pool;
