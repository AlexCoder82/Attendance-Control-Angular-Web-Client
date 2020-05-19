import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolClassStudent } from 'src/app/models/schoolClassStudent.model';
import { Absence } from 'src/app/models/absence.model';
import { SuccessMessageComponent } from 'src/app/shared/success-message/success-message.component';
import { MatDialog } from '@angular/material/dialog';
import { CallListService } from 'src/app/http/call-list.service';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {

  public schoolClassIds: number[];//Arrays con los ids de las clases por curso
  public callList: SchoolClassStudent[];//Listado de alumnos de la clase
  public message: string;

  constructor(
    private callListService: CallListService,
    private router: Router,
    private matDialog: MatDialog) {

    //Recupero los ids de las clases en el session storage
    let params = sessionStorage.getItem("schoolClassIds");
    this.schoolClassIds = JSON.parse(params);

  }

  ngOnInit(): void {

    this.setMessage();
    this.getCallList();

  }

  //Mensaje con el nombre de la asignatura y el horario
  public setMessage() {

    let subject = sessionStorage.getItem("subject");
    let startAt = sessionStorage.getItem("startAt");
    this.message = "Classe de " + subject + " prevista a las " + startAt + ".";

  }

  //Función que retorna si un alumno es ausente o no, 
  //llamada automaticamente por el checkbox de ausencia a cada evento
  public isStudentMissing(index: number): boolean {

    let studentIsmissing = false;

    if (this.callList[index].absence != null
      && this.callList[index].absence.type == 0)

      studentIsmissing = true;

    return studentIsmissing;

  }

  //Función que retorna si un alumno tiene retraso o no, 
  //llamada automaticamente por el checkbox de retraso a cada evento
  hasStudentDelay(index) {

    let studentHasDelay = false;

    if (this.callList[index].absence != null
      && this.callList[index].absence.type == 1)

      studentHasDelay = true;

    return studentHasDelay;

  }

  //Función llamada al pulsar el checkbox de ausencia
  onStudentMissingCheckedChange(event: any, index) {

    //Si se checkea se crea la ausencia de tipo total (0)
    if (event.target.checked) {

      //Si no existia la ausencia, se crea una nueva
      if (this.callList[index].absence == null) {

        let absence = new Absence();
        this.callList[index].absence = absence;

      }

      this.callList[index].absence.type = 0;

    }
    //si se quita el check, la ausencia pasa a ser de tipo cancelada (2)
    else {

      this.callList[index].absence.type = 2;
    }

  }

  //Función llamada al pulsar el checkbox de retraso
  onStudentHasDelayCheckedChange(event, index: number) {

    //Si se checkea se crea la ausencia de tipo retraso (1)
    if (event.target.checked) {

      //Si no existia la ausencia, se crea una nueva
      if (this.callList[index].absence == null) {

        let absence = new Absence();
        this.callList[index].absence = absence;

      }

      this.callList[index].absence.type = 1;

    }
    //si se quita el check, la ausencia pasa a ser de tipo cancelada (2)
    else {

      this.callList[index].absence.type = 2;

    }

  }

  //Petición para el listado de alumnos que deben estar presentes en las classes
  public getCallList() {
  
    this.callListService.getCallList(this.schoolClassIds).subscribe(
      (res: SchoolClassStudent[]) => {

        this.callList = res;

      }//Posible error del servidor manejado en el interceptor
    )
  }

  //Envia al cliente http la lista de alumnos
  public send() {

    this.callListService.sendCallList(this.callList).subscribe(
      res => {

        this.createSuccessMessageDialog("La lista de ausencias ha sido enviada.");

      }//Posible error del servidor manejado en el interceptor
    )
  }

  //Crea un dialog con el mensaje de exito
  private createSuccessMessageDialog(successMessage: string) {

    var dialog = this.matDialog.open(SuccessMessageComponent, {
      data: successMessage,
      disableClose: false
    });

    //Al cerrarse el dialog, vuelve a la pagina del listado de clases
    dialog.afterClosed().subscribe(
      success => {
        this.router.navigate(["/clases"]);
      }
    );

  }

}
