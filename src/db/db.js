import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "103.21.220.14",
  user: "recipe_admin",
  password: "#Bhulgaya123",
  database: "recipe_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export default pool;
