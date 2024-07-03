const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const Mongoose = require('mongoose');
require('dotenv').config('./.env');

const app = express();
const mongouri = 'mongodb+srv://meisibley:JMn0uiZCO8kXgsot@cluster0.cqszuq1.mongodb.net/';

const cors = require('cors');
// allow cross-origin requests
app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
  });

Mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });
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
