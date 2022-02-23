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
