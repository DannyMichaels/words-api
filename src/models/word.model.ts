import { Pool } from 'mysql2/promise';

export interface TWord {
  textContent: string;

  // optional because not being returned in some responses
  createdAt?: string; // iso
  createdBy?: string;
  id?: number;
}

function Word(word: TWord) {
  this.textContent = word.textContent;
  this.createdAt = word.createdAt;
  this.createdBy = word.createdBy;
}

Word.create = async (pool: Pool, newWord: TWord): Promise<TWord> => {
  try {
    const query = `INSERT INTO Word (textContent, createdBy) VALUES(?,?);`;

    const [{ insertId }]: any = await pool.query(query, [
      newWord.textContent,
      newWord.createdBy,
    ]);

    return { id: insertId, ...newWord, createdAt: new Date().toISOString() };
  } catch (error) {
    throw error;
  }
};

Word.findAll = async (pool: Pool): Promise<TWord[]> => {
  const query = 'SELECT textContent FROM Word;';
  const [result = []]: any = await pool.query(query);
  return result.map(({ textContent }: TWord) => textContent); // return only the value for each element instead of { textContent: "value" }
};

Word.findRandom = async (pool: Pool, limit = 1): Promise<TWord[]> => {
  const query = ` SELECT textContent FROM Word
                  ORDER BY RAND()
                  LIMIT ${limit};`;

  const [result = []]: any = await pool.query(query);
  return result.map(({ textContent }: TWord) => textContent);
};

Word.getOne = async (pool: Pool): Promise<TWord> => {
  const query = ` SELECT textContent FROM Word
                  ORDER BY RAND()
                  LIMIT 1;`;

  const [[result] = []]: any = await pool.query(query);
  return result;
};

Word.findById = async (pool: Pool, id: number): Promise<TWord> => {
  const query = ` SELECT textContent
                  FROM Word
                  WHERE id = ?;`;

  const [[result] = []]: any = await pool.query(query, id);
  return result;
};

Word.findAllByLength = async (
  pool: Pool,
  params: { length: number }
): Promise<TWord> => {
  const query = ` SELECT textContent FROM Word
                  WHERE LENGTH(textContent) = ?;`;

  const [result = []]: any = await pool.query(query, params.length);
  return result.map(({ textContent }: TWord) => textContent); // return only the value for each element instead of { textContent: "value" }
};

export default Word;
