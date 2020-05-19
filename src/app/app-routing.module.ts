import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/components/login/login.component';
import { ClassListComponent } from './modules/class-list/components/class-list.component';
import { CallListComponent } from './modules/call-list/components/call-list/call-list.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './modules/error/components/error/error.component';


//RUTAS
const routes: Routes = [

  {
    path: '',
    redirectTo: '/conexion',
    pathMatch: 'full'
  },
  {
    path: 'conexion',
    component: LoginComponent
  },
  {
    path: 'clases',
    component: ClassListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listado',
    component: CallListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    component: ErrorComponent
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
