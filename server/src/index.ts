import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './helper/auth';
import { sendRefreshToken } from './helper/sendRefreshToken';

(async () => {
  const app = express();
  app.use(cookieParser());

  process.on('unhandledRejection', (err) => {
    throw err;
  });

  app.get('/', (_req, res) => res.send('Hello World!'));

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
      res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      res.send({ ok: false, accessToken: '' });
    }

    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user!));

    return res.send({ ok: true, accessToken: createAccessToken(user!) });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(3000, () => {
    console.log('Server ready at PORT 3000!');
  });
})();
