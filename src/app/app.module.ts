import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './modules/header/header.module';
import { LoginModule } from './modules/login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SuccessMessageComponent } from './shared/success-message/success-message.component';
import { AuthenticationInterceptorService } from './interceptors/authentication-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NotifyServerErrorService } from './shared/services/notify-server-error.service';
import { ClassListModule } from './modules/class-list/class-list.module';
import { CallListModule } from './modules/call-list/call-list.module';
import { ErrorModule } from './modules/error/error.module';
import { LoadingSpinnerModule } from './shared/modules/loading-spinner/loading-spinner.module';
import { ConfigService } from './shared/services/config.service';

const appInitializerFn = (appConfig: ConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  }
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    ClassListModule,
    CallListModule,
    ErrorModule,
    LoadingSpinnerModule,

  ],

  entryComponents: [
    SuccessMessageComponent,
  ],
  providers: [
    NotifyServerErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-ES'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigService]
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
