import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const createSessionService = new CreateSessionService();

    const { token, user } = await createSessionService.execute({
      email,
      password,
    });

    return res.json({ user, token });
  };
}

export default new SessionController();
