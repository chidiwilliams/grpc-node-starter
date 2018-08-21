const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const createError = require('http-errors');

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());
app.use((req, res, next) => {
  req.remote_ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  next();
});

// ROUTES

app.use((req, res, next) => {
  res.status(404).send({ error: 'Not found' });
});

const server = app.listen(process.env.GATEWAY_PORT, () => {
  const { address, port } = server.address();
  process.on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
  console.log(`GRPC Node Gateway listening at http://${address}:${port}`);
});
