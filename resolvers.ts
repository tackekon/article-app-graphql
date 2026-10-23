import Article from "./model/article.model";

export const resolvers = {
    Query: {
      articles: () => Article.find({ deleted: false }),
    },
  };