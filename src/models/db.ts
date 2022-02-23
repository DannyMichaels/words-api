import mysql from 'mysql2';
import dbConfig from '../config/db.config';

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB_NAME,
});

export default pool;
