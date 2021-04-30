import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { UserContext } from '../UserContext';

export const isAuth: MiddlewareFn<UserContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('User not authenticated to access this route!');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    throw new Error('Token is expired or invalid!');
  }

  return next();
};
