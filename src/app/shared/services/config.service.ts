import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


/*
  Servicio que lee el archivo de configuracion y lo guarda en un BehaviorSubject,
  se instancia cuando se lanza la aplicacion tanto en desarrollo como en runtime
*/
@Injectable({
  providedIn: "root"
})
export class ConfigService {

  constructor(private injector: Injector) { }

  private appConfig: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  loadAppConfig() {

    var httpClient =  this.injector.get(HttpClient);
    httpClient.get('/assets/config.json').subscribe(
      config => {
        this.appConfig.next(config);
      },
      err=>{

      }
    );

  }

  get config() {
    return this.appConfig;
  }
  
}