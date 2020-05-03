import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassListComponent } from './components/class-list.component';




@NgModule({
  declarations: [ClassListComponent],
  imports: [
    CommonModule
  ],
  exports:[
    ClassListComponent
  ]
})
export class ClassListModule { }
