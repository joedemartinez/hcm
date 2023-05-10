import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },//, canActivate: [AppGuardGuard]
  { path: 'dashboard', component: DashboardComponent, },
  { path: 'employees', component: EmployeesComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
