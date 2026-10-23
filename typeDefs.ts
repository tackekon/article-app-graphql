
export const typeDefs = `#graphql
    type Article {
      id: ID!
      title: String
      avatar: String
      description: String
    }

    type Query {
      getListArticle: [Article!]!
    }
  `;