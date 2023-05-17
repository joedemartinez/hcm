import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ManageEmployeesComponent } from './components/employees/manage-employees/manage-employees.component';
import { LoginComponent } from './components/login/login.component';
import { ManagePostingsComponent } from './components/postings/manage-postings/manage-postings.component';
import { PostingsComponent } from './components/postings/postings.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { ManageUnitsComponent } from './components/units/manage-units/manage-units.component';
import { UnitsComponent } from './components/units/units.component';
import { ManageUsersComponent } from './components/users/manage-users/manage-users.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },//, canActivate: [AppGuard]
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeesComponent,canActivate: [AuthGuard] },
  { path: 'postings', component: PostingsComponent, canActivate: [AuthGuard]},
  { path: 'promotions', component: PromotionsComponent,canActivate: [AuthGuard] },
  { path: 'units', component: UnitsComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'manageUsers', component: ManageUsersComponent, canActivate: [AuthGuard]},
  { path: 'manageUnits', component: ManageUnitsComponent, canActivate: [AuthGuard]},
  { path: 'managePostings', component: ManagePostingsComponent, canActivate: [AuthGuard]},
  { path: 'manageEmployees', component: ManageEmployeesComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},

  { path: '**', component: DashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
