import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { PostingsComponent } from './components/postings/postings.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { UnitsComponent } from './components/units/units.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },//, canActivate: [AppGuardGuard]
  { path: 'dashboard', component: DashboardComponent, },
  { path: 'employees', component: EmployeesComponent, },
  { path: 'postings', component: PostingsComponent, },
  { path: 'promotions', component: PromotionsComponent, },
  { path: 'units', component: UnitsComponent, },
  { path: 'users', component: UsersComponent, },

  { path: '**', component: DashboardComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
