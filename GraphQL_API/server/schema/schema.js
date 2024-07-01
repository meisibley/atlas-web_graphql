//require graphql, add GraphQLObjectType object using the object destructuring syntax
const{GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLID} = require('graphql');

var TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString },
    })
  });

