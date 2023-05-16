import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private router: Router,private toastr: ToastrService,
    private http: HttpClient) { }

    //new emp form submission
  submitForm(addEmp:FormGroup){ 

    //make http post request
    this.http.post("http://localhost:8080/api/employees/add", addEmp).subscribe((results: any) => {
      console.log(results.status)
      if(results.status){
        this.toastr.success('Employee Added Successfully', 'Success!');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/employees'])
          );
      }else{
        this.toastr.warning('Oops!! Error Occured', 'Error!');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/employees'])
          );
      }
      
    })
    
  }


}



// constructor(private fs: AngularFirestore,private router: Router,private toastr: ToastrService) { }

// //new emp form submission
// submitForm(addEmp:FormGroup){ 
  
//   let empData = addEmp.value
//   this.fs.collection('employees').add(empData).then(ref => {
//     console.log(ref)
//     this.toastr.success('Employee Added Successfully', 'Success!');
//     // this.router.navigate(['/manage-employees'])
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
//         this.router.navigate(['/manage-employees'])
//     );
//   }).catch(err => {
//     console.log(err)
//     this.toastr.warning('Oops! Error Occured', 'Warning!');
//     // this.router.navigate(['/manage-employees'])
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
//         this.router.navigate(['/manage-employees'])
//     );
//   })
// }

// //load emp details
// loadEmpDetails(){
//   return this.fs.collection('employees').snapshotChanges().pipe(
//     map(actions => {
//       return actions.map(a => {
//         const data = a.payload.doc.data();
//         const id = a.payload.doc.id;
//         return { id, data}
//       })
//     })
//   )
// }

// //load 1 emp details
// loadEmpDetail(id){
//   //return this.fs.collection('employees').doc(id).valueChanges();//
//   return this.fs.doc(`employees/${id}`).valueChanges()
// }

// //update 1 emp details
// updateEmpDetail(id, data){
//   this.fs.doc(`employees/${id}`).update(data).then(()=>{
//     this.toastr.success('Employee Details has been updated successfully')
//     // this.router.navigate(['/manage-employees'])
//     //reload component
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
//         this.router.navigate(['/manage-employees'])
//     );
//   }).catch(err => {
//     this.toastr.warning('Oops!! Error occured!')
//     // this.router.navigate(['/manage-employees'])
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
//         this.router.navigate(['/manage-employees'])
//     );
//   })
// }

// //deleteEmp
// deleteEmp(id){
//   this.fs.doc(`employees/${id}`).delete().then(() => {
//     this.toastr.success('Employees has been deleted successfully')
//     // this.router.navigate(['/manage-employees'])
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
//         this.router.navigate(['/manage-employees'])
//     );
//   }).catch(err => {
//     this.toastr.warning('Oops!! Error occured!')
//     // this.router.navigate(['/manage-employees'])
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
//         this.router.navigate(['/manage-employees'])
//     );
//   })
// }

// //employees count
// countEmp(){
//   return this.fs.collection('employees').get().pipe(
//     map((count) => {
//       return count.size
//     })
//   )
// }
