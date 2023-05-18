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
  emp_name:any
  photo:any

  constructor ( private http: HttpClient,
    private logout: LogoutService) {
    this.getEmpVal()
  }

  ngOnInit(){
    // Read the initial value from local storage
    this.emp_name = localStorage.getItem('name');
    this.photo = localStorage.getItem('photo')
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
