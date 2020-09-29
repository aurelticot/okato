import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    test: String!
  }

  type Mutation {
    test: String!
  }
`;
