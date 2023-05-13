import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  user: any
  usersDetails: any
  empList:any
  date: any
  
  constructor ( private breadcrumb: BreadcrumbService, private toastr: ToastrService,
    private http: HttpClient,
    private modal: NgbModal) {
   
    this.toastr.warning('Oops!! Error Occured', 'Error!');

    this.breadcrumb.setPageDetails('Users','Users','/users','')//breadcrumb values

    this.getUsersDetails();//get Users details
    this.getEmpList() //history

  }

  getUsersDetails(){
    //users
    this.http.get("http://localhost:8080/api/users").subscribe((results: any) => {
      this.usersDetails =  results.data
      setTimeout(()=>{
        $('#usersDataTable').DataTable( {
          pagingType: 'simple_numbers',
          dom: 'C<"clear">lBfrtip',
          // dom: '<B<"clear">liflp',
          pageLength: 10,
          searching: true,
          processing: true,
          lengthMenu : [5, 10, 25, 50],
          destroy: true
        } );
      }, 2);
    })
  }

  getEmpList(){
    //users history
    this.http.get("http://localhost:8080/api/employees").subscribe((results: any) => {
      this.empList =  results.data
      
    })
  }

  

  conDate(val:any){ //conveting date to proper format
    this.date = new Date(val)
    const year = this.date.getFullYear();
    const month = ('0' + (this.date.getMonth() + 1)).slice(-2); // add leading zero if month is single digit
    const day = ('0' + this.date.getDate()).slice(-2); // add leading zero if day is single digit
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  //open modal
  openModal(){
    this.modal.open(AddUserComponent, { backdrop: false, size: 'sm' })
  }
}
