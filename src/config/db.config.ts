/* eslint-disable import/first */
require('dotenv').config();

export default {
  HOST: process.env.DATABASE_URL,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB_NAME: 'wordsDB',
};
