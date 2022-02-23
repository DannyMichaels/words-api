import createServer from './server';

const PORT = process.env.PORT || 3000;

const run = async () => {
  const app = await createServer();

  app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening at port ${PORT}`);
  });
};

run();
