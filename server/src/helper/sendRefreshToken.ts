import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: String) => {
  return res.cookie('refreshToken', token, { httpOnly: true });
};
