const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const users = require('./routes/users/v1/users');

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
app.use('/users', users);

app.use((req, res) => {
  res.status(404).send({ error: 'Not found' });
});

const server = app.listen(process.env.GATEWAY_PORT, () => {
  const { address, port } = server.address();
  process.on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
  console.log(`***\nGRPC Node Gateway started successfully on http://${address}:${port}\n***`);
});
