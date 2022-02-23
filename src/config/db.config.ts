import 'dotenv/config';

export default {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB_NAME: process.env.DATABASE_NAME,
};
