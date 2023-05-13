import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent {
  //form group
  addUnit!: FormGroup;

  constructor (private fb: FormBuilder, 
    private modal: NgbModal,
    private router: Router, 
    private http: HttpClient,
    private toastr: ToastrService) {
  

    //NEW POSTING MODAL
    //set validations
    this.addUnit = this.fb.group({
      Name: ['', [Validators.required]]
    })


  }


  submitForm(){

    //make http post request
    this.http.post("http://localhost:8080/api/units/add", this.addUnit.value).subscribe((results: any) => {

      if(results.status){
        this.toastr.success('Unit Added Successfully', 'Success!');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/units'])
          );
      }else{
        this.toastr.warning('Oops!! Error Occured', 'Error!');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/units'])
          );
      }

      this.closeModal()
    })
    
  }
 

  closeModal(){
    this.modal.dismissAll();
    this.router.navigate(['/units'])
  }
}
