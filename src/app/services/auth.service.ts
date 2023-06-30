import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedInGaurd: boolean = false;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor( private _login: AngularFireAuth, private _toastr: ToastrService, private _router: Router) { }

  login(email:any ,password:any){
    this._login.signInWithEmailAndPassword(email,password).then(logRef=>{
      this._toastr.success('Logged In Successfully');
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGaurd=true;
      this._router.navigate(['/']);
    }).catch(e=>{
      this._toastr.warning('Invalid Cerdentials');
    })
  }

  loadUser()
{
  this._login.authState.subscribe(user=>{
   localStorage.setItem('user',JSON.stringify(user));
  })
}

logOut(){
this._login.signOut().then(()=>{
  this._toastr.success("User logged out Successfully..!")
  this.loggedIn.next(false);
  this.isLoggedInGaurd=false;
  this._router.navigate(['/login']);
})
}

isLoggedIn(){
  return this.loggedIn.asObservable();
}

}
