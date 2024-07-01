const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./schema/schema');
const Mongoose = require('mongoose');
require('dotenv').config('./.env');
const PWD = process.env.MONGO_DB_PSW;

const app = express();

Mongoose.connect(PWD, { useNewUrlParser: true, useUnifiedTopology: true });
Mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Now browse to localhost:4000/graphql')
});
