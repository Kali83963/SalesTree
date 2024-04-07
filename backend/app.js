const express = require("express");
const cors = require('cors');
const compression = require('compression');
const db = require('./config/postgres');
const path = require('path');
const dotenv = require("dotenv").config();

const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes/userRoutes');
const productsRoutes = require('./routes/productsRoutes/productsRoutes');
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
app.use(express.static('public'));
app.use(compression());




app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/products',productsRoutes);
// app.use('/api', adminAuth.isValidAuthToken, coreApiRouter);
// app.use('/api', adminAuth.isValidAuthToken, erpApiRouter);
// app.use('/download', coreDownloadRouter);
// app.use('/public', corePublicRouter);

module.exports = app;