"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Task_1 = __importDefault(require("../models/Task"));
const TaskType = new graphql_1.GraphQLObjectType({
    name: 'Task',
    fields: {
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        completed: { type: graphql_1.GraphQLBoolean },
    }
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tasks: {
            type: new graphql_1.GraphQLList(TaskType),
            resolve() {
                return Task_1.default.find();
            },
        },
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTask: {
            type: TaskType,
            args: {
                title: { type: graphql_1.GraphQLString },
            },
            resolve(_, { title }) {
                const task = new Task_1.default({ title, completed: false });
                return task.save();
            },
        },
        updateTask: {
            type: TaskType,
            args: {
                id: { type: graphql_1.GraphQLID },
                completed: { type: graphql_1.GraphQLBoolean },
            },
            resolve(_, { id, completed }) {
                return Task_1.default.findByIdAndUpdate(id, { completed }, { new: true });
            },
        },
        deleteTask: {
            type: TaskType,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve(_, { id }) {
                return Task_1.default.findByIdAndDelete(id);
            },
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
