require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = process.env.PORT;
const DB =process.env.DB_URL;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(DB,{useNewUrlParser:true,useUniFiedTopology:true})
  .then(() => {
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Server problem", err);
  });


const register = require('./routes/register');
const login = require('./routes/login');


app.use('/login', login);
app.use('/register', register);

module.exports = app;
