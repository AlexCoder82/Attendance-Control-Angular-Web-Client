import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/http/session.service';
import { NotifyServerErrorService } from 'src/app/shared/services/notify-server-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public dni: string;
  public errorMessage: string;



  constructor(
    private sessionService: SessionService,
    private router: Router,
    private notifyServerErrorService: NotifyServerErrorService) {

      

    //Si se intercepta un error 401, se refleja el mensaje de error 
    this.notifyServerErrorService.notifyError401.subscribe(
      (errorMessage) => {
        this.errorMessage = errorMessage;
      })

      //Si se intercepta un error 403, se refleja el mensaje de error 
    this.notifyServerErrorService.notifyError403.subscribe(
      (errorMessage) => {
        this.errorMessage = errorMessage;
      })

  }

  ngOnInit(): void {

  }

  public login() {

    //Reinicio el mensaje de error
    this.errorMessage = "";
    this.sessionService.login(this.dni).subscribe(
      (res: any) => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('role', res.role);
        sessionStorage.setItem('id', res.id);
        sessionStorage.setItem('name', res.firstName);
        sessionStorage.setItem("schoolClasses", JSON.stringify(res.schoolClasses));
        //El profesor ahora esta logeado   
        this.sessionService.isSessionOpened.next(true);
        this.router.navigate(["classes"]);
      },
      httpErrorResponse => {
        console.log(httpErrorResponse.error.message)
        //Error de dni
        if (httpErrorResponse.status === 404) {
          this.errorMessage = httpErrorResponse.error.message;
        }
      }

    );
  }

}
