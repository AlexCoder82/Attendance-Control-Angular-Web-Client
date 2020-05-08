import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports:[
    LoadingSpinnerComponent
  ]
})
export class LoadingSpinnerModule { }
