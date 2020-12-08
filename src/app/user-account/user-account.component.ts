import {Component, OnInit} from '@angular/core';
import {UserComponent} from '../users/user.component';
import {UserService} from '../users/user.service';
import {CookieService} from 'ngx-cookie-service';
import {MenuComponent} from '../menu/menu.component';
import {Router} from '@angular/router';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {UserResponseInterface} from '../users/userResponseInterface';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  editIcon = faEdit;
public user: UserResponseInterface;


  constructor(private service: UserService,
              private cookies: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.service.getUserByEmail(this.cookies.get('email')).subscribe(
      data => {
        this.user = data;
      },
      error => {
        this.router.navigate(['/']);
        console.log('exception occured');
      }
    );
  }
}

