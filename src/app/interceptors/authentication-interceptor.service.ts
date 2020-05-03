import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../http/session.service';
import { NotifyServerErrorService } from '../shared/services/notify-server-error.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

/**
 * Intercepta todas las peticiones para agregar un header con el token de sesion
 * y todas las respuestas para tratar los posibles errores de autenticación
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService {

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private notifyServerErrorService: NotifyServerErrorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Agrego un header con la autorizacion antes de cada peticion al servidor 
    const token = sessionStorage.getItem('token');
    let request = req.clone({
      setHeaders: {
        Authorization: "Bearer " + token,

      }
    });

    return next.handle(request);

  }


}
