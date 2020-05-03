import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SchoolClass } from '../models/schoolClass.model';
import { SchoolClassStudent } from '../models/schoolClassStudent.model';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private API_URL = environment.apiURL ;

  public isSessionOpened: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.hasToken());

  constructor(private httpClient: HttpClient) {

   }

  public login(dni:string) {

    return this.httpClient.post(this.API_URL + "/teachers/sign-in/"+ dni, null );

  }

  public getCallList(schoolClassIds:number[]){

   
    let httpParams = new HttpParams();
    schoolClassIds.forEach(id => {
      httpParams = httpParams.append('schoolClassIds', id.toString());
    });

    return this.httpClient.get(this.API_URL+"/call-list",{ params: httpParams })
  }

  public sendCallList(callList:SchoolClassStudent[]){

    console.log(callList);
    return this.httpClient.post(this.API_URL+"/call-list",callList)
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
