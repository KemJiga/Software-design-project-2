const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Create' });
});

app.listen(8001, () => {
  console.log('Listening on port 8001');
});