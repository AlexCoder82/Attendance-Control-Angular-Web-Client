import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatDialogModule } from '@angular/material/dialog';
import { LoadingSpinnerModule } from 'src/app/shared/modules/loading-spinner/loading-spinner.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,  
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    LoadingSpinnerModule

  ],
  exports: [LoginComponent]
})
export class LoginModule { }
