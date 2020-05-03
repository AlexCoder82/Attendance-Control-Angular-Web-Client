import { Subject } from './subject.model';
import { Schedule } from './schedule.model';

export class SchoolClass {

    public id: number;
    public dayOfWeek: number;
    public subject: Subject;
    public schedule: Schedule;


}