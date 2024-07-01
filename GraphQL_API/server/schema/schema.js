//require graphql, add GraphQLObjectType object using the object destructuring syntax
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

var RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        task: {
            type: TaskType,
            args: { id: { type: GraphQLID } },
        },
        resolve: (parent, {id}) => {}
    }),
});

exports.schema = new GraphQLSchema({query: RootQuery});
