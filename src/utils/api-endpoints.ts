export default [
  {
    route: '/api/word',
    description: 'get one random word!',
  },
  {
    route: '/api/words/all',
    description: 'get all words in the database!',
  },
  {
    route: '/api/words/random?count={{count}}',
    example: '/api/words/random?count=2',
    description: 'get random words!',
  },
  {
    example: '/api/words/6',
    route: '/api/words/{{id}}',
    description: 'find a word by id (but why?)',
  },
];
