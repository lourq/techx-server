import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = 443;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
