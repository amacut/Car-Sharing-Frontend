import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {UserService} from '../users/user.service';
import {NgForm} from '@angular/forms';
import {RegistrationService} from '../registration.service';
import {User} from '../user';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user = new User();
  msg = '';

  constructor(private service: RegistrationService,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
  }

 /* login(email: string, password: string){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(email + ':' + password)});
    this.http.get('http://localhost:8080/', {headers, responseType: 'text' as 'json'});
  }*/
  loginUser() {
    this.service.loginUserFromRemote(this.user).subscribe(
      data => {
        console.log('response recieved');
        this.router.navigate(['/loginsuccess']);
      },
      error => {
        console.log('exception occured');
        this.msg = 'Zły email lub hasło.';
      }
    );
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }
}
