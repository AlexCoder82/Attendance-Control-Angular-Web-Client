import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../http/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private sessionService: SessionService, private router: Router) {

  }

  //Si la sesión esta cerrada, redirige a la página de login
  canActivate(): Observable<boolean> {

    this.sessionService.isSessionOpened.asObservable().subscribe(
      res => {
        if (res == false) {
          this.router.navigate(["/"]);

        }
      }

    )

    return this.sessionService.isSessionOpened;

  }

}

