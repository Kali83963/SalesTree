const express = require("express");
const cors = require('cors');
const compression = require('compression');
const db = require('./config/postgres')
const dotenv = require("dotenv").config();

const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const userRoutes = require('./routes/authRoutes');
// create our Express app
const app = express();

app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());


app.get('/', async (req, res) => {
    try {
        console.log(db)
      const result = await db.query('SELECT * FROM users');
      return res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
});

app.use('/api/auth',userRoutes);
// app.use('/api', adminAuth.isValidAuthToken, coreApiRouter);
// app.use('/api', adminAuth.isValidAuthToken, erpApiRouter);
// app.use('/download', coreDownloadRouter);
// app.use('/public', corePublicRouter);

module.exports = app;