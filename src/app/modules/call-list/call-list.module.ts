import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallListComponent } from './components/call-list/call-list.component';
import { LoadingSpinnerModule } from '../../shared/modules/loading-spinner/loading-spinner.module';



@NgModule({
  declarations: [CallListComponent],
  imports: [
    CommonModule,
    LoadingSpinnerModule
  ],
  exports:[
    CallListComponent
  ]
})
export class CallListModule { }
