import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLSchema, GraphQLList } from 'graphql';
import Task from '../models/Task';

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    tasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        return Task.find();
      },
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(_, { title }) {
        const task = new Task({ title, completed: false });
        return task.save();
      },
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: GraphQLID },
        completed: { type: GraphQLBoolean },
      },
      resolve(_, { id, completed }) {
        return Task.findByIdAndUpdate(id, { completed }, { new: true });
      },
    },
    deleteTask: {
      type: TaskType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, { id }) {
        return Task.findByIdAndDelete(id);
      },
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
