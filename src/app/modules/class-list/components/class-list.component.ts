import { Component, OnInit } from '@angular/core';
import { SchoolClass } from 'src/app/models/schoolClass.model';
import { SessionService } from 'src/app/http/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  constructor(private sessionService: SessionService, private router:Router) { }

  public schoolClasses: SchoolClass[];
  public teacherSchoolClasses: SchoolClass[];
  public welcomeMessage: string;
  public errorMessage:string;

  ngOnInit(): void {

    this.getTeacherClasses();
    this.setWelcomeMessage();

  }

  public setWelcomeMessage(){

    let name = sessionStorage.getItem("name");
    let message = "Hola " + name;
    if(this.teacherSchoolClasses.length ==0){
      message += ", hoy no impartes clases."
    }
    else{
      message += ", hoy impartes " + this.schoolClasses.length + " clases.";
    }
    this.welcomeMessage = message;
  }

  public getTeacherClasses() {
    this.schoolClasses = JSON.parse(sessionStorage.getItem("schoolClasses"));

    this.teacherSchoolClasses = new Array;
    this.schoolClasses.forEach(c => {

      let found = false;
      for (let i = 0; i < this.teacherSchoolClasses.length && !found; i++) {
        if (c.schedule.start == this.teacherSchoolClasses[i].schedule.start) {
          found = true;
        }
      }

      if (!found) {
        this.teacherSchoolClasses.push(c);
      }

    })
  }

  public getCallList(schoolClass: SchoolClass) {

    if (this.hasSchoolClassAlreadyStarted(schoolClass.schedule.start)) {

      let ids: number[] = new Array();
      let schoolClassIds: number[] = this.schoolClasses
        .filter(x => x.schedule.start == schoolClass.schedule.start)
        .map(x => x.id);

        let params = JSON.stringify(schoolClassIds);
        sessionStorage.setItem("schoolClassIds", params);
      sessionStorage.setItem("subject",schoolClass.subject.name);
      
      sessionStorage.setItem("startAt",schoolClass.schedule.start)

        this.router.navigate(['call-list']);
    }
    else{
      this.errorMessage = "Esta clase aún no ha empezado."
    }
  }

  public hasSchoolClassAlreadyStarted(time: string): boolean {

    let result: boolean = false;
    let now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (now > time) {
      result = true;
    }

    return result;
  }

}
