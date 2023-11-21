const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Delete' });
});

app.listen(8002, () => {
  console.log('Listening on port 8002');
});