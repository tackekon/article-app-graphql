import { expressMiddleware } from "@as-integrations/express5";
import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer } from "@apollo/server";

import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolver";
import { requireAuth } from "./middlewares/auth.middleware";

const startServer = async (): Promise<void> => {
  dotenv.config();

  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  await database.connect();

  app.use("/graphql", requireAuth);

  const apolloServer = new ApolloServer({ 
    typeDefs : typeDefs, 
    resolvers : resolvers, 
    introspection: true 
  });

  // phải dùng await trước function start 
  await apolloServer.start();

  app.use("/graphql", express.json(), 
    expressMiddleware(apolloServer,{
      context: async ({ req }) => {
        return { ...req };
      }
    })
  );



  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

startServer().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exitCode = 1;
});


// Rest API
// app.get("/articles", async (req: Request, res: Response) => {
//   const articles = await Article.find({
//     deleted: false
//   })

//   res.json({
//     articles: articles
//   });
// });

