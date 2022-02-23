import dbConfig from '../config/db.config';
import mysql from 'mysql2/promise';

const dbConnect = async () => {
  const pool = await mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_NAME,
  });

  return pool;
};

export default dbConnect;
