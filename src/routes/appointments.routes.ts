import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (req, res) =>
  res.json({ message: 'Hello GoStack' }),
);

export default appointmentsRouter;
