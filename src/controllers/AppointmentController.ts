import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppointmentCreateService from '../services/CreateAppointmentService';

class AppointmentController {
  public list = async (req: Request, res: Response): Promise<Response> => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    return res.json({
      appointments: await appointmentsRepository.find({
        relations: ['provider'],
      }),
    });
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { provider_id, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointment = new AppointmentCreateService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return res.json({ appointment });
  };
}

export default new AppointmentController();
