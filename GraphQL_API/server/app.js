const { schema } = require('./schema/schema')
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var mongoose = require('mongoose');
const cors = require('cors');

var app = express();
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

require('dotenv').config('./.env');
const PSW = process.env.MONGO_DB_PSW;
mongoose.connect(`mongodb+srv://meisibley:${PSW}@cluster0.tscxw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

mongoose.connection.once('open', () => {console.log('connected to database');}
);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
