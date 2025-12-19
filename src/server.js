import express from 'express';

const app = express();
const port = 3000;

app.get('/about', (req, res) => {
  res.send('Hello, this is the about page.');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
