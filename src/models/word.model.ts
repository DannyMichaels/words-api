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
    const query = `INSERT INTO Word (textContent, createdBy) VALUES (?, ?)`;

    const [{ insertId }]: any = await pool.query(query, [
      newWord.textContent,
      newWord.createdBy,
    ]);
    return { id: insertId, ...newWord };
  } catch (error) {
    throw error;
  }
};

Word.getAll = async (word: TWord) => {
  let query = 'SELECT * FROM word';

  const [result]: any = await pool.query(query);

  return result;
};
