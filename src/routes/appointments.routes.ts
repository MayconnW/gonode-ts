import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();

appointmentsRouter.get('/', AppointmentController.list);
appointmentsRouter.post('/', AppointmentController.create);

export default appointmentsRouter;
