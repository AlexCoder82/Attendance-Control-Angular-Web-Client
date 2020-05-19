import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SchoolClassStudent } from '../models/schoolClassStudent.model';

@Injectable({
  providedIn: 'root'
})
export class CallListService {

  private API_URL = environment.apiURL;

  constructor(private httpClient: HttpClient) {

  }

  public getCallList(schoolClassIds:number[]){
  
    let httpParams = new HttpParams();
    schoolClassIds.forEach(id => {
      httpParams = httpParams.append('schoolClassIds', id.toString());
    });

    return this.httpClient.get(this.API_URL+"/call-list",{ params: httpParams })

  }

  public sendCallList(callList:SchoolClassStudent[]){

    return this.httpClient.post(this.API_URL+"/call-list",callList)
  }
}
