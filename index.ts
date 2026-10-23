import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async (): Promise<void> => {
  dotenv.config();

  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  await database.connect();

  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  // phải dùng await trước start server
  await apolloServer.start();

  app.use("/graphql", express.json(), expressMiddleware(apolloServer));
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

