export const typeDefs = `#graphql
    type Resort {
      _id: ID
      name: String
      location: String
      keyword: [String]
      imgUrl : String
      city : String
      rating : String
      isFullRefund : Boolean
      costPrice : Int
      salePrice : Int
      totalPrice : Int
      grade : Int
    }

    type Query {
      result(keyword: String): [Resort]
    }
`;