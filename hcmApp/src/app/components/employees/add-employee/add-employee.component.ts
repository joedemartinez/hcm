import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  //form group
  addEmp!: FormGroup;
  unitList: any
  imageName!: any


  constructor (private fb: FormBuilder, 
    private modal: NgbModal,
    private router: Router, 
    private http: HttpClient,
    private toastr: ToastrService) {
    
      this.toastr.warning('Oops!! Error Occured', 'Error!');

    //NEW EMPLOYEE MODAL
    //set validations
    this.addEmp = this.fb.group({
      emp_id: ['', [Validators.required]],
      emp_email: ['', [Validators.required, Validators.email]],
      emp_firstname: ['', [Validators.required]],
      emp_middlename: ['', [Validators.required]],
      emp_surname: ['', [Validators.required]],
      emp_gender: ['', [Validators.required]],
      emp_dob: ['', [Validators.required]],
      emp_maritalstatus: ['', [Validators.required]],
      emp_phoneno: ['', [Validators.required]],
      emp_highestqualification: ['', [Validators.required]],
      emp_staffstatus: ['', [Validators.required]],
      emp_yearswithministry: ['', [Validators.required]],
      unit_id: ['', [Validators.required]],
      photo: ['']
    })


  }

  ngOnInit():void{
    this.getUnitList()
  }

  submitForm(){
    // this.empService.submitForm(this.addEmp)
    //check if edit or save modal
    // if (this.id) { //edit
    //   this.empService.updateEmpDetail(this.id, this.addEmp.value)
    //   this.closeModal()
    // } else { // save
    //   this.empService.submitForm(this.addEmp)
    //   this.closeModal()
    // }

    //set values
    this.addEmp.value.photo = this.imageName

    //make http post request
    this.http.post("http://localhost:8080/api/employees/add", this.addEmp.value).subscribe((results: any) => {
      console.log(results.status)
      if(results.status){
        this.toastr.success('Employee Added Successfully', 'Success!');
          // this.router.navigate(['/manage-employees'])
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/employees'])
          );
          this.closeModal()
      }else{
        this.toastr.warning('Oops!! Error Occured', 'Error!');
          // this.router.navigate(['/manage-employees'])
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/employees'])
          );
      }
    })
    //this.closeModal()
    // 
    
  }

  getUnitList(){
    this.http.get("http://localhost:8080/api/units").subscribe((results: any) => {
      this.unitList =  results.data
    })
  }

  onFileSelected(event:any) {
    this.imageName = event.target.files[0].name;
  }

  closeModal(){
    this.modal.dismissAll();
    this.router.navigate(['/employees'])
  }

}
