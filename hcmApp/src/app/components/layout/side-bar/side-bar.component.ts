import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
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
  token:any

  constructor ( private httpService: HttpService,
    private logout: LogoutService) {
    this.getEmpVal()
  }

  ngOnInit(){
    // Read the initial value from local storage
    this.token = localStorage.getItem('jwt');
    //get token values
    const parts = this.token.split('.');
    // Decode the base64-encoded payload
    const payload = JSON.parse(atob(parts[1]))

    this.emp_name = payload.name;
    this.photo = payload.photo
  }

  getEmpVal(){ 
    //Emp
    
    this.httpService.get("http://localhost:8080/api/count/emps").subscribe((results: any) => {
      this.emp =  results.data[0]['count'] 
    })
  }

  logOut(){
    this.logout.logout()
  }
}
