import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotifyServerErrorService } from '../shared/services/notify-server-error.service';
import { SessionService } from '../http/session.service';


/**
 * Intercepta todas las respuestas del servidor para tratar los errores 500
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(
    private router: Router,
    private notifyServerErrorService: NotifyServerErrorService,
    private sessionService: SessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    return next.handle(req).pipe(
      retry(0),
      catchError((httpErrorResponse: HttpErrorResponse) => {
  
        let errorMessage: string = httpErrorResponse.message;

        this.notifyServerErrorService.onNotifyErrorStatus(httpErrorResponse.status);

        //Si el servidor devuelve un error interno
        if (httpErrorResponse.status === 500) {
          this.handleError500(httpErrorResponse);
        }

        // Si el servidor no responde
        if (httpErrorResponse.status === 0) {
          this.handleError0();
        }

        //Si se intenta acceder a un componente reservado a otro role
        if (httpErrorResponse.status === 403) {
          this.handleError403();
        }

        //Si el servidor no reconoce el token 
        if (httpErrorResponse.status === 401) {
          this.handleError401();
        }

        //Lanzo cualquier otro error para tratarlo de manera local
        return throwError(httpErrorResponse);

      })
    );

  }

  handleError500(httpErrorResponse: HttpErrorResponse) {

    //pagina de error 
    this.router.navigate(['/error']);
    //notifico el error devuelto por el servidor
    this.notifyServerErrorService.onNotifyError500(httpErrorResponse);

  }

  handleError0() {
   
    //pagina de error 
    this.router.navigate(['/error']);
  }

  //Trata el error 401
  handleError401() {

    let message: string;
    //cierra la session en el caso de que este abierta
    let isSessionOpened = this.sessionService.isSessionOpened.asObservable()
        if ( of(isSessionOpened)) {
          this.sessionService.logout();

          message = "La sessión ha expirado";
          //envio el usuario/admin a la pagina principal
          this.router.navigate(['/']);
          //Guardo el mensaje en el servicio de errores para mostrarlo  
          this.notifyServerErrorService.onNotifyError401(message);
        }
        else {
          message = "Debes estar autenticado para acceder a este recurso";
          //envio el usuario/admin a la pagina para registrarse 
          this.router.navigate(['/']);
          //notifico el error devuelto por el servidor    
          this.notifyServerErrorService.onNotifyError403(message);
        }
      
    

  }

  //Trata el error 403
  handleError403() {

    //envio el usuario/admin a la pagina principal 
    this.router.navigate(['/error']);
    let message: string = "*No tiene los permisos para acceder a este recurso"
    //notifico el error devuelto por el servidor
    this.notifyServerErrorService.onNotifyError403(message);

  }

}
