
import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-employee-detail',
    standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee?: Employee;
  employeeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.employeeService.getEmployee(params.get('id')!)
      )
    ).subscribe(employee => {
      this.employee = employee;
      this.initForm(); 
    });
  }

  initForm(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: [this.employee?.firstName, Validators.required],
      lastName: [this.employee?.lastName, Validators.required],
      email: [this.employee?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.employee?.phoneNumber, Validators.required],
      position: [this.employee?.position],
      department: [this.employee?.department]
    });
  }

  updateEmployee(): void {
    if (this.employeeForm.valid && this.employee) {
      const formData = this.employeeForm.value;
      this.employeeService.updateEmployee(this.employee.id, formData).subscribe(
        () => {
          console.log('Employee updated successfully');
        },
        error => {
          console.error('Error updating employee:', error);
        }
      );
    }
  }
}