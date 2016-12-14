import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v4';
import { Server } from 'http';
import Express from 'express';

// initialize the server and configure support for ejs templates
const app    = new Express();
const server = new Server(app);
const db     =
// define the folder that will be used for static assets
const staticPath = path.join(__dirname, 'static');
app.use(Express.static(staticPath));

// API


// start the server
const port = process.env.PORT || 3000;
const env  = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});