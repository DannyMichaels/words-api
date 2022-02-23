import pool from './db';

export interface TWord {
  textContent: string;
  createdDateTime: string; // iso
  createdBy: string;
}

function Word(word: TWord) {
  this.textContent = word.textContent;
  this.createdDateTime = word.createdDateTime;
  this.createdBy = word.createdBy;
}

Word.create = async (newWord: TWord) => {
  try {
    const query = `INSERT INTO Word (textContent, createdBy) VALUES (?, ?);`;

    const [{ insertId }]: any = await pool.query(query, [
      newWord.textContent,
      newWord.createdBy,
    ]);
    return { id: insertId, ...newWord };
  } catch (error) {
    throw error;
  }
};

Word.findAll = async () => {
  const query = 'SELECT textContent FROM Word;';
  const result: any = await pool.query(query);

  return result.map(({ textContent }: TWord) => textContent);
};

Word.findRandom = async (limit = 1) => {
  const query = `SELECT textContent FROM Word
                ORDER BY RAND()
                LIMIT ${limit};`;

  const result: any = await pool.query(query);
  return result.map(({ textContent }: TWord) => textContent);
};

Word.findById = async (id: number) => {
  const query = `SELECT textContent
                FROM Word
                WHERE id = ?;`;

  const [result]: any = await pool.query(query, id);
  return result;
};

export default Word;
