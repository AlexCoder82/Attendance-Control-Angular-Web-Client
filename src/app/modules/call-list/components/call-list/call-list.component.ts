import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/http/session.service';
import { Router } from '@angular/router';
import { SchoolClassStudent } from 'src/app/models/schoolClassStudent.model';
import { Absence } from 'src/app/models/absence.model';
import { SuccessMessageComponent } from 'src/app/shared/success-message/success-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {

  public schoolClassIds: number[];
  public callList: SchoolClassStudent[];
  public message:string;


  constructor(
    private sessionService: SessionService,
    private router: Router,
    private matDialog:MatDialog) {

    //Recupero los ids de las clases en el session storage
    let params = sessionStorage.getItem("schoolClassIds");
    this.schoolClassIds = JSON.parse(params);

  }

  ngOnInit(): void {

    this.setMessage();
    this.getCallList();

  }

  public setMessage(){

    let subject = sessionStorage.getItem("subject");
    let startAt = sessionStorage.getItem("startAt");
    this.message = "Classe de " + subject + " prevista a las " + startAt + ".";
  }

  //Función que retorna si un alumno es ausente o no, 
  //llamada automaticamente por el checkbox de ausencia a cada evento
  public isStudentMissing(index): boolean {

    let studentIsmissing = false;

    if (this.callList[index].absence != null && this.callList[index].absence.type == 0)
      studentIsmissing = true;

    return studentIsmissing;
  }

  //Función que retorna si un alumno tiene retraso o no, 
  //llamada automaticamente por el checkbox de retraso a cada evento
  hasStudentDelay(index) {
    let studentHasDelay = false;
    if (this.callList[index].absence != null && this.callList[index].absence.type == 1)
      studentHasDelay = true;
    return studentHasDelay;
  }

  //Función llamada al pulsar el checkbox de ausencia
  onStudentMissingCheckedChange(event, index) {

    //Si se checkea se crea la ausencia de tipo total (0)
    if (event.target.checked) {
      if(this.callList[index].absence == null){
        let absence = new Absence(); 
        this.callList[index].absence = absence;
      }
      this.callList[index].absence.type = 0;
      
    }
    //si se quita el check, la ausencia pasa a ser nula
    else {

      this.callList[index].absence.type = 2;
    }

  }

  //Función llamada al pulsar el checkbox de retraso
  onStudentHasDelayCheckedChange(event, index) {

    //Si se checkea se crea la ausencia de tipo retraso (1)
    if (event.target.checked) {
      if(this.callList[index].absence == null){
        let absence = new Absence(); 
        this.callList[index].absence = absence;
      }
      this.callList[index].absence.type = 1;
      
    }
    //si se quita el check, la ausencia pasa a ser nula
    else {

      this.callList[index].absence.type = 2;
    }

  }

  //Petición para el listado de alumnos que deben estar presentes en las classes
  public getCallList() {

    this.sessionService.getCallList(this.schoolClassIds).subscribe(
      (res: SchoolClassStudent[]) => {

        this.callList = res;
        console.log(this.callList);

      },
      err => {

      }
    )
  }

  public send(){
    
    this.callList.forEach(c=>{
      console.log(c.absence.type)
    });
    this.sessionService.sendCallList(this.callList).subscribe(   
      res => {

        this.createSuccessMessageDialog("El listado de alumnos ha sido enviado con éxito.");

      },
      err => {

      }
    )
  }

  

  //Crea un dialog con el mensaje de Ã©xito
  private createSuccessMessageDialog(successMessage: string) {

    var dialog = this.matDialog.open(SuccessMessageComponent, {
      data: successMessage,
      disableClose: false
    });

    dialog.afterClosed().subscribe(
      success=>{
        this.router.navigate(["/classes"]);
      }
    );

  }

}
