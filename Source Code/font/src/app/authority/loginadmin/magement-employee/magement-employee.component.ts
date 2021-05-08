import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service'
import { Router } from '@angular/router';
import { Employee } from '../../../model/Employee';

@Component({
  selector: 'app-magement-employee',
  templateUrl: './magement-employee.component.html',
  styleUrls: ['./magement-employee.component.css']
})
export class MagementEmployeeComponent implements OnInit {

  employees:Employee[] = [];
  selectEmployee:Employee;
  checkImage: Boolean[] = [];
  constructor(private router: Router,private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.getEmployees();
   
  }

  public async getEmployees(){
    /*this.employeesService.getEmployees().subscribe(getemployees => {
      this.employees = getemployees
      for(let i=0; i<this.employees.length;i++){
        if(this.employees[i].employeeImage != null)
        {
          this.checkImage[i] = true;
        }
        else{
          this.checkImage[i] = false;
        }
      }
    })
    */
   try{
    this.employees = await this.employeesService.getEmployees() as Employee[];
    for(let i=0; i<this.employees.length;i++){
       if(this.employees[i].employeeImage != null)
       {
         this.checkImage[i] = true;
       }
       else{
         this.checkImage[i] = false;
       }
     }
   }
   catch(err){
     
   }
  }

  onselecte(employee:Employee): void{
    this.selectEmployee = employee;
  }

}
