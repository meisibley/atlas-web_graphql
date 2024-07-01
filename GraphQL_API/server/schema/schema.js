
const{GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLSchema} = require('graphql');
const Task = require("../models/task");
const Project = require("../models/project");

var TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
      id: { type: GraphQLID },
      projectId: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString },
      project: {
          type: ProjectType,
          resolve: (parent, args) => {
            return Project.findById(parent.projectId);
          }
      }
    })
  });

var ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString },
      tasks: {
          type: new GraphQLList(TaskType),
          resolve: (parent, args) => {
            return Task.find({projectId: parent.id})}
      }
    })
  });

var RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      task: {
        type: TaskType,
        // `args` describes the arguments that the `task` query accepts
        args: {
          id: { type: GraphQLID }
        },
        resolve: (parent, {id}) => { 
          // return db.tasks.find(task => task.id === id)
          return Task.findById(id)
        }
      },
      project: {
        type: ProjectType,
        // `args` describes the arguments that the `task` query accepts
        args: {
          id: { type: GraphQLID }
        },
        resolve: (parent, args) => {
          // return db.projects.find(project => project.id === id)
          return Project.findById(args.id);
        }
      },
      tasks: {
        type: new GraphQLList(TaskType),
        resolve: () => Task.find({})
      },
      projects: {
        type: new GraphQLList(ProjectType),
        resolve: () => Project.find({})
      }
    }
  });

  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      addProject: {
        type: ProjectType,
        args: {
          title: {type: GraphQLNonNull(GraphQLString)},
          weight: {type: GraphQLNonNull(GraphQLInt)},
          description: {type: GraphQLNonNull(GraphQLString)},
        },
        resolve: (parent, args) => {
          let project = new Project({
            title: args.title,
            weight: args.weight,
            description: args.description
          });
          return project.save();
          // const project = { id: uuid(), title: args.title, weight: args.weight, description: args.description }
          // projects.push(project)
          // return project
        }
      },
      addTask: {
        type: TaskType,
        args: {
          title: {type: GraphQLNonNull(GraphQLString)},
          weight: {type: GraphQLNonNull(GraphQLInt)},
          description: {type: GraphQLNonNull(GraphQLString)},
          projectId: {type: GraphQLNonNull(GraphQLID)}
        },
        resolve: (parent, args) => {
          let task = new Task({
            title: args.title,
            weight: args.weight,
            description: args.description,
            projectId: args.projectId
          });
          return task.save();
          // const task = { id: uuid(), title: args.title, weight: args.weight, description: args.description }
          // tasks.push(task)
          // return task
        }
      }

    })
  });

  exports.schema = new GraphQLSchema({query: RootQuery, mutation: Mutation});
