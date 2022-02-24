export default [
  {
    route: '/api/word',
    description: 'get one random word!',
  },
  {
    route: '/api/words/random?count={{count}}',
    example: '/api/words/random?count=2',
    description: 'get N random words!',
  },
  {
    route: '/api/words/all',
    description: 'get all words in the database!',
  },
  {
    route: '/api/words/all?length={{length}}',
    example: '/api/words/all?length=5',
    description: 'get all words of N length!',
  },
  {
    example: '/api/words/2664',
    route: '/api/words/{{id}}',
    description: 'find a word by id (but why?)',
  },
];
