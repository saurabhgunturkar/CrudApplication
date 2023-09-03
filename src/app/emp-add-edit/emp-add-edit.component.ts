import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { CoreService } from '../core/core.service';




@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  education:string[]=[
    'Matric', 'Diploma/12th', 'Graduate', 'Post Graduate', 'Doctorate'
  ]

  empForm:FormGroup;

  constructor(
    private _fb:FormBuilder, 
    private _empService:EmployeeService, 
    private _dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    
  ){
    this.empForm=this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    })
  }

  ngOnInit():void{
    this.empForm.patchValue(this.data);
  }
  
  onFormSubmit(){
  
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value).subscribe({
            next: (val: any) => {
              alert('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error();
            },
          }); 
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }


}



