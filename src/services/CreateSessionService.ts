import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const userFound = await usersRepository.findOne({
      where: { email },
    });
    if (!userFound) {
      throw new AppError('User not found', 401);
    }

    const validPassword = await compare(password, userFound.password);
    if (!validPassword) {
      throw new AppError('Password does not match', 401);
    }

    const { secret, expiresIn } = authConfig;
    const token = sign({ id: userFound.id }, secret, {
      subject: userFound.id,
      expiresIn,
    });
    delete userFound.password;

    return { token, user: userFound };
  }
}
