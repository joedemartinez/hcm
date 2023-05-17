import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  emp: any

  constructor ( private http: HttpClient,
    private logout: LogoutService) {
    this.getEmpVal()
  }

  getEmpVal(){
    //Emp
    
    this.http.get("http://localhost:8080/api/count/emps").subscribe((results: any) => {
      this.emp =  results.data[0]['count']
    })
  }

  logOut(){
    this.logout.logout()
  }
}
