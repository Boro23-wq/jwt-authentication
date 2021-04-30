import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from './UserResolver';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import 'dotenv/config';

async function startApolloServer() {
  const app = express();
  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  // app.use((_, res) => {
  //   res.status(200);
  //   res.send('Hello!');
  //   res.end();
  // });

  await new Promise(() =>
    app.listen(3000, () => console.log('Server ready at PORT 3000!'))
  );
  return { apolloServer, app };
}

startApolloServer();
