import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  msg = '';
  userCookie = null;
  public user = new User();

  constructor(private service: UserService,
              private router: Router,
              private http: HttpClient,
              private cookie: CookieService) {
  }

  ngOnInit(): void {
  }
  // form: FormGroup = new FormGroup({
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required),
  // });

  loginUser() {
    this.service.loginUser(this.user).subscribe(
      data => {
        console.log('response recieved');
        this.user = data;
        this.cookie.set('email', this.user.email);
        this.cookie.set('id', this.user.id + '');
        // console.log(this.userResponse);
        this.router.navigate(['/mainpage']);
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
