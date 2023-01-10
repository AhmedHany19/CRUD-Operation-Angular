import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard-model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formBuilder: FormBuilder, private service: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.service.postEmployee(this.employeeModelObj).subscribe(
      (res: any) => {
        alert('Employee Add Succseded');
        let ref = document.getElementById('close');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (error) => {
        alert('Error');
      }
    );
  }

  getAllEmployee() {
    this.service.getEmployee().subscribe((res: any) => {
      this.employeeData = res;
    });
  }

  deleteEmployee(emp: any) {
    this.service.deleteEmployee(emp.id).subscribe((res) => {
      alert('Employee Deleted Succseded');
      this.getAllEmployee();
    });
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEditEmployee(emp: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.formValue.controls['firstName'].setValue(emp.firstName);
    this.formValue.controls['lastName'].setValue(emp.lastName);
    this.formValue.controls['email'].setValue(emp.email);
    this.formValue.controls['mobile'].setValue(emp.mobile);
    this.formValue.controls['salary'].setValue(emp.salary);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.service
      .updateEmployee(this.formValue.value, this.employeeModelObj.id)
      .subscribe((res) => {
        alert('Updated Succsseded');
        let ref = document.getElementById('close');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
}
