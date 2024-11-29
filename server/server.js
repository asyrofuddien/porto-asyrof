const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

app.use(cors());

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.json({ message: 'sucess' });
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port} 🚀`);
});
