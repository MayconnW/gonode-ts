import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';

import User from '../models/User';

class UserController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password, avatar_id } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      avatar_id,
    });

    return res.json({ user });
  };

  public list = async (req: Request, res: Response): Promise<Response> => {
    const repo = getRepository(User);
    const users = await repo.find({ relations: ['avatar'] });

    return res.json({ users });
  };
}

export default new UserController();
