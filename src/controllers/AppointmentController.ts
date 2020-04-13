import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/Appointments';
import AppointmentCreateService from '../services/CreateAppointment';

class AppointmentController {
  private appointmentsRepository: AppointmentsRepository;

  constructor() {
    this.appointmentsRepository = new AppointmentsRepository();
  }

  public list = (req: Request, res: Response): Response =>
    res.json({ appointments: this.appointmentsRepository.all() });

  public create = (req: Request, res: Response): Response => {
    try {
      const { provider, date } = req.body;
      const parsedDate = parseISO(date);

      const createAppointment = new AppointmentCreateService(
        this.appointmentsRepository,
      );

      const appointment = createAppointment.execute({
        date: parsedDate,
        provider,
      });

      return res.json({ appointment });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  };
}

export default new AppointmentController();
