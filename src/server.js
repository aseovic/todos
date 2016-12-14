import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v4';
import { Server } from 'http';
import Express from 'express';
import MongoClient from 'mongodb';
import todosApi from './todosApi';

// initialize the server and configure support for ejs templates
const app    = new Express();
const server = new Server(app);

// define the folder that will be used for static assets
const staticPath = path.join(__dirname, 'static');
app.use(Express.static(staticPath));

// ToDos API
app.use('/api', todosApi);

// start the server
const port = process.env.PORT || 3000;
const env  = process.env.NODE_ENV || 'production';

const mongoUrl = "mongodb://todos-app:todos-pass@gcp-us-east1-cpu.0.dblayer.com:15362,gcp-us-east1-cpu.1.dblayer.com:15362/todos?ssl=true";
//const mongoUrl = "mongodb://localhost:27017/todos";

MongoClient.connect(mongoUrl, {promiseLibrary: Promise}, (err, db) => {
  if (err) {
    return console.error(err);
  }
  console.info(`Connected to MongoDB ${db.s.databaseName}`);

  app.locals.db = db;

  server.listen(port, err => {
    if (err) {
      return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
  });
});
