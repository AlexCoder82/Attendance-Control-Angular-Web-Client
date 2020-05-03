import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/http/session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public sessionIsOpened : Observable<boolean>;
  
  constructor(private sessionService:SessionService) {

    //Si la sesion esta abierta se muestra el enlace para cerrar sesion
    this.sessionIsOpened = this.sessionService.isSessionOpened.asObservable();

   }

  ngOnInit(): void {
  }

  public signOut(){
    
    this.sessionService.logout();
  }
}
