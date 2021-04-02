// Call in installed dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import mainRoutes from './routes/main.js';
import { HOST, PORT, DB } from './config/db.config.js';
import appConfig from './config/app.config.js';
// set up express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// set up mongoose
mongoose.Promise = global.Promise;
mongoose.connect(`${HOST}:${PORT}/${DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error connecting to database', error);
  });

// set up home route
app.get('/', (request, respond) => {
  respond.status(200).json({
    message: 'Welcome to Project Support',
  });
});


app.listen(appConfig.PORT, (request, respond) => {
  console.log(`Our server is live on ${appConfig.PORT}. Yay!`);
});
// set up route
app.use('/api/', mainRoutes);