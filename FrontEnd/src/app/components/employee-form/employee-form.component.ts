
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-employee-form',
    standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      position: [''],
      department: ['']
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      this.employeeService.addEmployee(formData).subscribe({
        next: (response) => {
          console.log('Employee added successfully', response);
          this.router.navigate(['/employees']); 
        },
        error: (err) => {
          console.error('Error adding employee', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
