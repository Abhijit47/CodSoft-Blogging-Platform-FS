const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config({ path: './config.env' });

app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to the reactive blog API." });
});

app.use('/api/v1', userRouter);
app.use('/api/v1', postRouter);

app.all('*', (req, res, next) => {
  res.status(400).json({ message: `Cant't ${req.method} request on this ${req.originalUrl} URL.` });
  next();
});

module.exports = app;