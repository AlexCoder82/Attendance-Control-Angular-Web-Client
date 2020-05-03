import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../http/session.service';
import { NotifyServerErrorService } from '../shared/services/notify-server-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  constructor(  private notifyServerErrorService: NotifyServerErrorService,private sessionService: SessionService,private router:Router) {}

  canActivate(): Observable<boolean> {
    
    this.sessionService.isSessionOpened.asObservable().subscribe(
      res=>{
          if(res== false){
            this.router.navigate(["/"]);
            
          }
          
      }
      
    )
    return this.sessionService.isSessionOpened;
    
        
  }

}

