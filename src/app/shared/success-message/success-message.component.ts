import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  public successMessage: string;

  constructor(
    private matDialiogRef: MatDialogRef<SuccessMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { 

      this.successMessage = data;

    }

  ngOnInit() {
  }

  //Al pulsar cerrar
  close() {

    this.matDialiogRef.close();
    
  }

}
