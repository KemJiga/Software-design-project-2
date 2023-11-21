const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Read' });
});

app.listen(8003, () => {
  console.log('Listening on port 8003');
});