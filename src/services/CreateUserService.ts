import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import Storage from '../models/Storage';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  avatar_id: string;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar_id,
  }: Request): Promise<User | undefined> {
    const usersRepository = getRepository(User);
    const storageRepository = getRepository(Storage);

    const emailAlreadyTaken = await usersRepository.findOne({
      where: { email },
    });

    if (emailAlreadyTaken) {
      throw new AppError('Email already taken');
    }

    if (avatar_id) {
      const avatarExist = await storageRepository.findOne(avatar_id);
      if (!avatarExist) {
        throw new AppError('Informed avatar_id does not exist');
      }
    }

    const cryptedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: cryptedPassword,
      avatar_id,
    });

    await usersRepository.save(user);

    const result = await usersRepository.findOne(user.id, {
      relations: ['avatar', 'appointments'],
    });

    return result;
  }
}
