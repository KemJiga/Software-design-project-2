const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Root' });
  });
app.use('/create', proxy('http://localhost:8001'));
app.use('/read', proxy('http://localhost:8002'));
app.use('/delete', proxy('http://localhost:8004'));
app.use('/update', proxy('http://localhost:8003'));


app.listen(8000, () => {
  console.log('Listening on port 8000');
});