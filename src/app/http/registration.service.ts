import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private API_URL = environment.apiURL + "/teachers/sign-up";
  constructor(private httpClient: HttpClient) { }

  public signUp(dni: string, userName: string, password: string) {

    let url = this.API_URL + "/" + dni;
    return this.httpClient.post(url,{ userName, password });

  }
}
