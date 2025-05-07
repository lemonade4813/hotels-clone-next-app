export const typeDefs = `#graphql
    type Resort {
      _id: ID
      name: String
      direction: String
      keyword: [String]
      imgUrl : String
      city : String
      rating : String
      isFullRefund : Boolean
      costPrice : Int
      salePrice : Int
      totalPrice : Int
    }

    type Query {
      result(keyword: String): [Resort]
    }
`;