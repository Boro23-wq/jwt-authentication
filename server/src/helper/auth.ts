import { sign } from 'jsonwebtoken';

// importing entity
import { User } from 'src/entity/User';

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '10m',
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '10d',
  });
};
