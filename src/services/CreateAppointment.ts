import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/Appointments';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointment {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const foundAppointmentInTheSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (foundAppointmentInTheSameDate) {
      throw new Error('This date is already taken');
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointment;
