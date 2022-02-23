import dbConnect from '../db/dbConnect';
import WORDS from '../utils/words';

const run = async () => {
  const pool = await dbConnect();

  for await (const word of WORDS) {
    const sql = `
      INSERT INTO Word (textContent, createdBy) VALUES (?, ?)
    `;
    const [{ insertId }]: any = await pool.query(sql, [word, 'admin']);

    console.log('word inserted', word, insertId);
  }

  console.log('done seeding words');

  process.exit(1);
};

run();
