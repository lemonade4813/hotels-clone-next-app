export const typeDefs = `#graphql
    type Resort {
      _id: ID
      name: String
      direction: String
      keyword: [String]
    }

    type Query {
      result(keyword: String): [Resort]
    }
`;