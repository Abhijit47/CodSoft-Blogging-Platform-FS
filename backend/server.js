const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const MONGO_URL = process.env.DATABASE_URI;
const MONGO_PASSWORD = process.env.DATABASE_PASSWORD;

const DB = MONGO_URL.replace("<password>", MONGO_PASSWORD);
mongoose.connect(DB)
  .then(() => {
    console.log('Connection successful.');
  }).catch((err) => {
    console.log(`Something went wrong with connection ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});