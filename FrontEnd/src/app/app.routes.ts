
import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
      {
        path: '',
        component: HomeComponent
    },
    {
        path: 'employees',
        component: EmployeeListComponent
    },
     { path: 'employees/:id', component: EmployeeDetailComponent },
    {
        path: 'add-employee',
        component: EmployeeFormComponent
    },

//   { path: '**', redirectTo: '/employees' } 
];
