import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../../../../model/Employee';
import { EmployeesService } from '../../../../services/employees.service'

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee:Employee;
  constructor(private route:ActivatedRoute,private employeesService:EmployeesService,private location:Location) { 
    
  }

  ngOnInit(): void {
  }

  public onSubmit(employee){
    this.employeesService.updateEmployee(employee).subscribe(data => {
      alert("Lưu thành công")
    })
  }
}
