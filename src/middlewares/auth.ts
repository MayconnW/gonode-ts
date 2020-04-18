// import decodeToken from "../services/DecodeToken";
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('Token not provided', 401);
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new AppError(`Please send the token using 'bearer' Pattern `, 401);
  }

  try {
    const { secret } = authConfig;
    const decodedToken = verify(token, secret);

    const { sub } = decodedToken as TokenPayload;
    req.user = { id: sub };

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};
