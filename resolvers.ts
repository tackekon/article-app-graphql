import Article from "./model/article.model";

export const resolvers = {
    Query: {
      getListArticle: async () => {
        const articles = await Article.find({ 
          deleted: false 
        });

        return articles;
      },
    },
  };