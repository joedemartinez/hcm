import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-posting',
  templateUrl: './add-posting.component.html',
  styleUrls: ['./add-posting.component.css']
})
export class AddPostingComponent {
  //form group
  addPosting!: FormGroup;
  empList: any

  constructor (private fb: FormBuilder, 
    private modal: NgbModal,
    private router: Router, 
    private http: HttpClient,
    private toastr: ToastrService) {
  

    //NEW POSTING MODAL
    //set validations
    this.addPosting = this.fb.group({
      // emp_id: ['', [Validators.required]],
      // emp_email: ['', [Validators.required, Validators.email]],
      // emp_firstname: ['', [Validators.required]],
      // emp_middlename: ['', [Validators.required]],
      // emp_surname: ['', [Validators.required]],
      // emp_gender: ['', [Validators.required]],
      // emp_dob: ['', [Validators.required]],
      // emp_maritalstatus: ['', [Validators.required]],
      // emp_phoneno: ['', [Validators.required]],
      // emp_highestqualification: ['', [Validators.required]],
      // emp_staffstatus: ['', [Validators.required]],
      // emp_yearswithministry: ['', [Validators.required]],
      // unit_id: ['', [Validators.required]],
      // photo: ['']

    })


  }

  ngOnInit():void{
    this.getEmpList()
  }

  submitForm(){

    //make http post request
    this.http.post("http://localhost:8080/api/employees/add", this.addPosting.value).subscribe((results: any) => {
      console.log(results.status)
      if(results.status){
        this.toastr.success('Employee Added Successfully', 'Success!');
          // this.router.navigate(['/manage-employees'])
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/postings'])
          );
          this.closeModal()
      }else{
        this.toastr.warning('Oops!! Error Occured', 'Error!');
          // this.router.navigate(['/manage-employees'])
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/postings'])
          );
      }
    })
    
  }

  getEmpList(){
    this.http.get("http://localhost:8080/api/employees").subscribe((results: any) => {
      this.empList =  results.data
      console.log(this.empList)
    })
  }

  closeModal(){
    this.modal.dismissAll();
    this.router.navigate(['/employees'])
  }
}
