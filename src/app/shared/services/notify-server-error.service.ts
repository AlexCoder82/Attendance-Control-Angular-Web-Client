import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/**
 *  Observables con los mensajes de error devueltos por el interceptor
 */
export class NotifyServerErrorService {

  //Guarda el codigo de error
  public notifyErrorStatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  //Guarda el mensaje de error en caso de error 401
  public notifyError401: BehaviorSubject<string> = new BehaviorSubject<string>("");
  //Guarda el mensaje de error en caso de error 403
  public notifyError403: BehaviorSubject<string> = new BehaviorSubject<string>("");

  //Método para cambiar el codigo de error
  public onNotifyErrorStatus(status: number) {

    this.notifyErrorStatus.next(status);

  }

  //Método para cambiar el mensaje de error
  public onNotifyError401(errorMessage: string) {

    this.notifyError401.next(errorMessage);

  }

  //Método para cambiar el mensaje de error
  public onNotifyError403(errorMessage: string) {

    this.notifyError403.next(errorMessage);

  }

}
