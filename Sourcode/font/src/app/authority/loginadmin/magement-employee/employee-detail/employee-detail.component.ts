import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../../../../model/Employee';
import { EmployeesService } from '../../../../services/employees.service'
import { ToastService } from 'src/app/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Account } from  '../../../../model/Account';
import { User } from  '../../../..//model/User';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee:Employee;

   // Load hình và đổi hình
  public image: File;

  constructor(private storage: AngularFireStorage,private toast: ToastService,private route:ActivatedRoute,private employeesService:EmployeesService,private location:Location) { 
    
  }

  ngOnInit(): void {

  }

  public handleFileInput(event) {

    var files: FileList;
    files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files.item(0));
    reader.onload = (event: any) => {
      this.employee.employeeImage = event.target.result
    }   
    this.image = files.item(0);
    
  }
 
 
  public onSubmit = async (employee) => {
    if(this.image){
     var nameUserImage = "userimages"
     var filePath = `${nameUserImage}/${this.image.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
     const fileRef = this.storage.ref(filePath);
     this.storage.upload(filePath, this.image).snapshotChanges().pipe(
       finalize(() => {
         fileRef.getDownloadURL().subscribe((url) => {
           var employeeNew = new Employee();
           employeeNew = employee;
           employeeNew.employeeImage = url;
 
           this.employeesService.updateEmployee(employee).subscribe(data => {
            this.toast.toastSuccess('Lưu thành công');
            })
         })
       })
     ) .subscribe();
    }
    else{
      var employeeNew = new Employee();
      employeeNew = employee;
 
      this.employeesService.updateEmployee(employee).subscribe(data => {
        this.toast.toastSuccess('Lưu thành công');
        })
    }
   
    window.location.reload();
  }
}
