import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 *  Observables con el mensaje de error enviado por el interceptor
 */
export class NotifyServerErrorService {


  public notifyError401: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public notifyError403: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public notifyError500: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject<HttpErrorResponse>(null);
  public notifyErrorStatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  public onNotifyErrorStatus(status: number) {

    this.notifyErrorStatus.next(status);

  }

  public onNotifyError401(errorMessage: string) {

    this.notifyError401.next(errorMessage);
    
  }

  public onNotifyError403(errorMessage: string) {

    this.notifyError403.next(errorMessage);

  }

  public onNotifyError500(httpErrorResponse: HttpErrorResponse) {

    this.notifyError500.next(httpErrorResponse);

  }
  
}
