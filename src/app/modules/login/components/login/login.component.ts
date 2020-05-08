import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/http/session.service';
import { NotifyServerErrorService } from 'src/app/shared/services/notify-server-error.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public dni: string;
  public waiting: boolean = false;
  public errorMessage: string;
  public sessionIsOpened: Observable<boolean>;


  constructor(
    private sessionService: SessionService,
    private router: Router,
    private notifyServerErrorService: NotifyServerErrorService) {


    //Indica si la sesión esta abierta o no
    this.sessionIsOpened = this.sessionService.isSessionOpened.asObservable();

    //Comprueba si se ha interceptado un error de sesion 401 o 403

    this.notifyServerErrorService.notifyErrorStatus.subscribe(
      status => {

        if (status == 401) {
          //Si se intercepta un error 401, se refleja el mensaje de error creado
          //en el interceptor
          this.notifyServerErrorService.notifyError401.subscribe(
            (errorMessage) => {
              if (errorMessage.length > 0)
                this.errorMessage = errorMessage;
            })
        }

        if (status == 403) {
          //Si se intercepta un error 403, se refleja el mensaje de error 
          this.notifyServerErrorService.notifyError403.subscribe(
            (errorMessage) => {
              if (errorMessage.length > 0)
                this.errorMessage = errorMessage;
            })
        }

      }
    );

  }

  ngOnInit(): void {

  }

  //Evento al pulsar el botón de conexión
  public login() {

    //Reinicio el posible mensaje de error
    this.errorMessage = "";
    this.waiting = true;
  
    this.sessionService.login(this.dni).subscribe(
      (res: any) => {

        //El profesor esta logeado   
        this.sessionService.isSessionOpened.next(true);

        //Guarda los datos devueltos por el servidor en el sessionstorage
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('role', res.role);
        sessionStorage.setItem('id', res.id);
        sessionStorage.setItem('name', res.firstName);
        sessionStorage.setItem("schoolClasses", JSON.stringify(res.schoolClasses));

        this.showSchoolClasses();
        
      },
      httpErrorResponse => {

        this.waiting = false;
        //Error:dni no encontrado
        if (httpErrorResponse.status === 404) {
          this.errorMessage = httpErrorResponse.error;
        }
      }

    );

    
  }

  //Envia a la pagina del listado de clases
  public showSchoolClasses() {
    this.router.navigate(["classes"]);
  }
}
