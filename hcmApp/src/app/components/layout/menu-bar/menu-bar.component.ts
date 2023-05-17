import { Component } from '@angular/core';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  date = new Date()
  todayDate:String =this.date.toUTCString()
  log: any

  constructor( private logout: LogoutService){  }


  logOut(){
    this.logout.logout()
  }

}
