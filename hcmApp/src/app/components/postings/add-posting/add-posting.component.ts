import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      emp_id: ['', [Validators.required]],
      post_from: ['', [Validators.required]],
      post_to: ['', [Validators.required]],
      region: ['', [Validators.required]],
      effectiveDate: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      assumptionDate: ['', [Validators.required]]
    })


  }

  ngOnInit():void{
    this.getEmpList()
  }

  submitForm(){

    //make http post request
    this.http.post("http://localhost:8080/api/postings/add", this.addPosting.value).subscribe((results: any) => {
  
      if(results.status){
        this.toastr.success('Posting Added Successfully', 'Success!');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/postings'])
          );
      }else{
        this.toastr.warning('Oops!! Error Occured', 'Error!');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/postings'])
          );
      }

      this.closeModal()
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
    this.router.navigate(['/postings'])
  }
}
