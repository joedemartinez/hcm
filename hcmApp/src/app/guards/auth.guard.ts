import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private route: ActivatedRoute){
    
  }


  log:any
  currentPath:any

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Read the initial value from local storage
    this.log = localStorage.getItem('loggedIn');

    // Listen for the storage event and update the value in real-time
    window.addEventListener('storage', () => {
      this.log = localStorage.getItem('loggedIn');
    })

      //block login page
    this.route.url.subscribe(url => {
      this.currentPath = state.url;
      console.log('Current path:', this.currentPath);
    });

    if (this.log === 'true') {
      if (this.currentPath == "/login") {
        this.router.navigate(['/dashboard']) //logged in but trying to access the login page
      } 

      return true; //if logged In
    } else {
      // this.router.navigate(['/login']) //go to login page if not logged in
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/login'])
      );
      return false
    }

    
    
  }
  
}
