import createServer from './server';

const PORT = process.env.PORT || 4000;

const app = createServer();

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server listening at port ${PORT}`);
});
