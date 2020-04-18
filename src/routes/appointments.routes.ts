import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
appointmentsRouter.use(authMiddleware);
appointmentsRouter.get('/', AppointmentController.list);
appointmentsRouter.post('/', AppointmentController.create);

export default appointmentsRouter;
