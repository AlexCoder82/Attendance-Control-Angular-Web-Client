import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SchoolClassStudent } from '../models/schoolClassStudent.model';
import { ConfigService } from '../shared/services/config.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallListService {

  private API_URL;
  public onConfifRead: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private configService: ConfigService, private httpClient: HttpClient) {

     this.configService.config.subscribe(
      config => {
        if (config != null) {
          this.API_URL = config.apiURL;
          this.onConfifRead.next(true);
        }

      }
    );

  }


  public getCallList(schoolClassIds: number[]) {

    let httpParams = new HttpParams();
    schoolClassIds.forEach(id => {
      httpParams = httpParams.append('schoolClassIds', id.toString());
    });
   
     return this.httpClient.get(this.API_URL+"/api/call-list",{ params: httpParams })

  }

  public sendCallList(callList: SchoolClassStudent[]) {

    return this.httpClient.post(this.API_URL + "/api/call-list", callList)
  }

}
