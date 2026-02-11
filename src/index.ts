import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Brighte Eats API running at ${url}`);
});
