
export const typeDefs = `#graphql
    type Article {
      id: ID!,
      title: String,
      avatar: String,
      description: String
    }

    type Query {
      getListArticle: [Article!]!,
      getArticle(id: ID): Article
    }

    input ArticleInput {
      title: String,
      avatar: String,
      description: String
    }

    type Mutation {
      createArticle(article:ArticleInput ): Article
    }
  `;