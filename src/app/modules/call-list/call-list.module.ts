import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallListComponent } from './components/call-list/call-list.component';



@NgModule({
  declarations: [CallListComponent],
  imports: [
    CommonModule
  ],
  exports:[
    CallListComponent
  ]
})
export class CallListModule { }
