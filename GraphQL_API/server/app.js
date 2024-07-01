//initializing the Express server with express-graphql which is a middleware, applied here to
//just a single route, the /graphql route:
var express = require('express');
var { graphqlHTTP } = require('express-graphql');

var app = express();

app.use('/graphql', graphqlHTTP({
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('Now browse to localhost:4000/graphql')
});
