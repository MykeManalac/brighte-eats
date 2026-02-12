export const typeDefs = `#graphql
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
  }

  type Query {
    leads: [Lead!]!
    lead(id: String!): Lead
  }

  type Mutation {
    registerLead( lead: LeadInput): Lead!
  }

  input LeadInput {
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: ServiceType!
  }
`;
