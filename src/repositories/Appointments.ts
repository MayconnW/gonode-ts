import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateProps {
  provider: string;
  date: Date;
}

class Appointments {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date }: CreateProps): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const found = this.appointments.find(item => isEqual(item.date, date));
    return found || null;
  }
}

export default Appointments;
