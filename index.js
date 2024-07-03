const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todo.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());

app.use(bodyParser.json());
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
