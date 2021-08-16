import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service'
import { Router } from '@angular/router';
import { Employee } from '../../../model/Employee';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@Component({
  selector: 'app-magement-employee',
  templateUrl: './magement-employee.component.html',
  styleUrls: ['./magement-employee.component.css']
})
export class MagementEmployeeComponent implements OnInit {

  employees:Employee[] = [];
  selectEmployee:Employee;
  image = "";

  //pagination
  totalRecord: Number;
  page:Number = 1;

  constructor(public dialog: MatDialog,private router: Router,private employeesService: EmployeesService) { 
    this.image = "../../../assets/images/blog_3.jpg";
   }

  async ngOnInit(): Promise<void> {
    await this.getEmployees();
  }

  public handlePageChange(event) {
    this.page = event;
  }
     
  public async getEmployees(){
   try{
    this.employees = await this.employeesService.getEmployees() as Employee[];
    for(let i=0; i<this.employees.length;i++){
       if(this.employees[i].employeeImage == null)
       {
        this.employees[i].employeeImage = this.image;
       }
     }
   }
   catch(err){
     
   }
  }

  onselecte(employee:Employee): void{
    var em = new Employee();
    em = employee;
    this.selectEmployee = em;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      direction: "ltr",
      width: '500px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      await this.getEmployees();
    });
  }
}
