import { gql } from "apollo-server";

export const typeDefs = gql`
  enum ServiceType {
    DELIVERY
    PICKUP
    PAYMENT
  }

  type Lead {
    id: String!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: ServiceType!
    createdAt: String!
  }

  type Query {
    leads: [Lead!]!
    lead(id: String!): Lead
  }

  type Mutation {
    register(
      name: String!
      email: String!
      mobile: String!
      postcode: String!
      services: ServiceType!
    ): Lead!
  }
`;
