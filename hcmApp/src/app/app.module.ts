import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTablesModule } from 'angular-datatables'
import { NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MenuBarComponent } from './components/layout/menu-bar/menu-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BreadcrumbComponent } from './components/layout/breadcrumb/breadcrumb.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { PostingsComponent } from './components/postings/postings.component';
import { AddPostingComponent } from './components/postings/add-posting/add-posting.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { AddPromotionComponent } from './components/promotions/add-promotion/add-promotion.component';
import { UnitsComponent } from './components/units/units.component';
import { AddUnitComponent } from './components/units/add-unit/add-unit.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    FooterComponent,
    MenuBarComponent,
    DashboardComponent,
    BreadcrumbComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    PostingsComponent,
    AddPostingComponent,
    PromotionsComponent,
    AddPromotionComponent,
    UnitsComponent,
    AddUnitComponent,
    UsersComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
