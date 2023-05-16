import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ManageEmployeesComponent } from './components/employees/manage-employees/manage-employees.component';
import { ManagePostingsComponent } from './components/postings/manage-postings/manage-postings.component';
import { PostingsComponent } from './components/postings/postings.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { ManageUnitsComponent } from './components/units/manage-units/manage-units.component';
import { UnitsComponent } from './components/units/units.component';
import { ManageUsersComponent } from './components/users/manage-users/manage-users.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },//, canActivate: [AppGuardGuard]
  { path: 'dashboard', component: DashboardComponent, },
  { path: 'employees', component: EmployeesComponent, },
  { path: 'postings', component: PostingsComponent, },
  { path: 'promotions', component: PromotionsComponent, },
  { path: 'units', component: UnitsComponent, },
  { path: 'users', component: UsersComponent, },
  { path: 'manageUsers', component: ManageUsersComponent, },
  { path: 'manageUnits', component: ManageUnitsComponent, },
  { path: 'managePostings', component: ManagePostingsComponent, },
  { path: 'manageEmployees', component: ManageEmployeesComponent, },

  { path: '**', component: DashboardComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
