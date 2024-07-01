
const{GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLSchema} = require('graphql');

var TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString },
    })
  });

