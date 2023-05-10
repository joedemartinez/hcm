import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  users: any
  emp: any
  exits: any
  units: any

  constructor ( private breadcrumb: BreadcrumbService, private http: HttpClient) {
    this.breadcrumb.setPageDetails('Dashboard','','','')

    this.getDashboardVals()
  }

  getDashboardVals(){
    //Users
    this.http.get("http://localhost:8080/api/count/users").subscribe((results: any) => {
      this.users = results.data[0]['count']
    })

    //Emp
    this.http.get("http://localhost:8080/api/count/emps").subscribe((results: any) => {
      this.emp =  results.data[0]['count']
    })
    //Exits
    this.http.get("http://localhost:8080/api/count/exits").subscribe((results: any) => {
      this.exits =  results.data[0]['count']
    })
    //units
    this.http.get("http://localhost:8080/api/count/units").subscribe((results: any) => {
      this.units =  results.data[0]['count']
    })
  }

}
