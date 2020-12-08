import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {UserService} from '../users/user.service';
import {NgForm} from '@angular/forms';
import {RegistrationService} from '../registration/registration.service';
import {User} from '../users/user';
import {UserResponseInterface} from '../users/userResponseInterface';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user = new User();
  msg = '';
  userCookie = null;
  public userResponse: UserResponseInterface;

  constructor(private service: RegistrationService,
              private router: Router,
              private http: HttpClient,
              private cookie: CookieService) {
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
        this.userResponse = data;
        this.cookie.set('email', this.userResponse.email);
        // console.log(this.userResponse);
        this.router.navigate(['/user/mainpage']);
      },
      error => {
        console.log('exception occured');
        this.msg = 'Zły email lub hasło.';
      }
    );
  }
  logoutUser() {
    console.log('wylogowanie');
    this.router.navigate(['/']);
    this.cookie.deleteAll();
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }
}
