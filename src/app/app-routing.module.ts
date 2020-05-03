import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/components/login/login.component';
import { ClassListComponent } from './modules/class-list/components/class-list.component';
import { CallListComponent } from './modules/call-list/components/call-list/call-list.component';
import { AuthGuard } from './guards/auth.guard';


//RUTAS
const routes: Routes = [

  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: LoginComponent
  },
  {
    path: 'classes',
    component: ClassListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'call-list',
    component: CallListComponent,
    canActivate: [AuthGuard]
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
