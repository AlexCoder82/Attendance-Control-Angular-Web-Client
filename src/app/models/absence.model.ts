import { Schedule } from './schedule.model';
import { Subject } from './subject.model';

export class Absence {

    public id: number;
    public type: number;
    public date :Date 
    public  schedule: Schedule;
    public subject: Subject 

}