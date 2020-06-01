import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../shared/services/config.service';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private API_URL;

  public isSessionOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private configService: ConfigService, private httpClient: HttpClient) {
    this.configService.config.subscribe(
      config => {
        if (config != null){
          this.API_URL = config.apiURL;
        }
          

      }
    );

  }

  public signIn(dni: string) {


    return this.httpClient.post(this.API_URL + "/api/teachers/sign-in/" + dni, null);

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
