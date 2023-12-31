import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private _auth: AuthService){

  }

  onSubmit(formData:any){
    this._auth.login(formData.email,formData.password);
  }

}
