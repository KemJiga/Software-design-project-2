const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Root' });
  });
app.use('/create', proxy('http://create-ms:8001'));
app.use('/read', proxy('http://read-ms:8002'));
app.use('/update', proxy('http://update-ms:8003'));
app.use('/delete', proxy('http://delete-ms:8004'));
app.use('/log', proxy('http://logs-ms:8005'));


app.listen(8000, () => {
  console.log('Listening on port 8000');
});