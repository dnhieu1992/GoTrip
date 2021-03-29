// Call in installed dependencies
const express = require('express');
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import mainRoutes from './routes/main';
// set up express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
// set up port number
const port = 5035;
// set up mongoose
mongoose.Promise = global.Promise;
const config = require('./config/secret');
mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

// set up home route
app.get('/', (request, respond) => {
  respond.status(200).json({
    message: 'Welcome to Project Support',
  });
});


app.listen(port, (request, respond) => {
  console.log(`Our server is live on ${port}. Yay!`);
});
// set up route
app.use('/api/', mainRoutes);