import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'dialog-insert',
    templateUrl: 'dialog-insert.html',
  })
  export class DialogInsert implements OnInit{
    itemForm: FormGroup;
  
    ngOnInit(): void {
      this.generateForm();
    }

    constructor(
      public dialogRef: MatDialogRef<any>,
      private formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    close(): void {
      this.dialogRef.close();
    }
    
    save(){
      this.dialogRef.close(this.itemForm.value);
    }

    generateForm(){
      this.itemForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: ['', Validators.required]
      })
    }
  
  }