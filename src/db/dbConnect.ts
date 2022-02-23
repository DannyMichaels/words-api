import dbConfig from '../config/db.config';
import mysql, { Pool } from 'mysql2/promise';

const dbConnect = async () => {
  const pool: Pool = await mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_NAME,
  });

  return pool;
};

export default dbConnect;
