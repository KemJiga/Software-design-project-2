const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Update' });
});

app.listen(8004, () => {
  console.log('Listening on port 8004');
});