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

  constructor(private sessionService: SessionService, private router: Router) { }

  public schoolClasses: SchoolClass[];//Lista de todas las clases por id
  public teacherSchoolClasses: SchoolClass[];//Lista de las clases que da el profesor
  public welcomeMessage: string;
  public errorMessage: string;

  ngOnInit(): void {

    this.setTeacherClasses();
    this.setWelcomeMessage();

  }

  //Mensaje de bienvenida
  public setWelcomeMessage() {

    let name = sessionStorage.getItem("name");
    let message = "Hola " + name;

    if (this.teacherSchoolClasses.length == 0) {
      message += ", hoy no impartes clases."
    }
    else {
      message += ", hoy impartes " + this.schoolClasses.length + " clases.";
    }

    this.welcomeMessage = message;

  }

  //Las clases por curso recibidas se juntan en clases del profesor
  //por horario para conseguir una lista de clases con horarios unicos
  public setTeacherClasses() {

    this.schoolClasses = JSON.parse(sessionStorage.getItem("schoolClasses"));

    this.teacherSchoolClasses = new Array;

    this.schoolClasses.forEach(c => {

      let found = false;

      //Rellena el array de clases del profesor con clases de diferentes horarios
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

  //Evento al pulsar un enlace "Pasar lista", recibe la clase elegida
  public getCallList(schoolClass: SchoolClass) {

    //Si la clase ya ha empezado
    if (this.hasSchoolClassAlreadyStarted(schoolClass.schedule.start)) {

      //a partir del horario de la clase elegida, se crea un array de ids
      //de todas las clases por curso que se imparten a la misma hora 
      let schoolClassIds: number[] = this.schoolClasses
        .filter(x => x.schedule.start == schoolClass.schedule.start)
        .map(x => x.id);

      //Guardo el array,el nombre de la asignatura y el horario en el 
      //sessionStorage
      let params = JSON.stringify(schoolClassIds);
      sessionStorage.setItem("schoolClassIds", params);
      sessionStorage.setItem("subject", schoolClass.subject.name);

      sessionStorage.setItem("startAt", schoolClass.schedule.start)

      //Abre la página con la lista de alumnos
      this.router.navigate(['call-list']);
    }
    else {
      this.errorMessage = "Esta clase aún no ha empezado."
    }
  }

  //Comprueba si en este momento exacto, la clase ya ha empezado o no
  public hasSchoolClassAlreadyStarted(starAt: string): boolean {

    let result: boolean = false;
    let now = new Date()
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (now > starAt) {
      result = true;
    }

    return result;
  }

}
