
import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service'; 
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
    standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  @Input() employee!: Employee;

  constructor(private employeeService: EmployeeService) {}

  deleteEmployee(): void {
    if (!this.employee) {
      console.error('Employee data not available.');
      return;
    }

    const employeeId = this.employee.id.toString(); 
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        console.log(`Employee with ID ${employeeId} deleted successfully.`);
      },
      error => {
        console.error('Error deleting employee:', error);
      }
    );
  }
}