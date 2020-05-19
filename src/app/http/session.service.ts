import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SchoolClassStudent } from '../models/schoolClassStudent.model';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private API_URL = environment.apiURL ;

  public isSessionOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private httpClient: HttpClient) {

   }

  public signIn(dni:string) {

    return this.httpClient.post(this.API_URL + "/teachers/sign-in/" + dni, null );

  }

  //Cierra la sesión y borra el session storage
  public logout() {

    sessionStorage.clear();

    this.isSessionOpened.next(false);

  }

  //Comprueba si alguna sesion  esta abierta
  public hasToken(): boolean {

    return !!sessionStorage.getItem('token');

  }


}
