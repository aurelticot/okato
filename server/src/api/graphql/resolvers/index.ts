import { IResolvers } from "apollo-server-express";

export const resolvers: IResolvers = {
  Query: {
    test: () => {
      return "Query.test";
    },
  },
  Mutation: {
    test: () => {
      return "Mutation.test";
    },
  },
};
