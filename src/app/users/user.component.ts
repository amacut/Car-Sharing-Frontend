import {Component, OnInit} from '@angular/core';

import {UserService} from './user.service';

import {UserResponseInterface} from './userResponseInterface';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  hide = true;
  public user: UserResponseInterface;


  constructor(public service: UserService,
              private cookies: CookieService,
              private loginComponent: LoginComponent,
              private router: Router,
              private dialog: MatDialog,
              private notification: NotificationService) {
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

  onEdit() {
    this.service.populateForm(this.user);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '81vh';
    dialogConfig.data = {
      response : this.user.id
    };
    this.dialog.open(EditUserComponent, dialogConfig);
  }

  deleteUser() {
    this.service.deleteUser(this.user.email).subscribe(
      data => {
        console.log('ok');
        this.loginComponent.logoutUser();
        this.notification.success('Usunięto użytkownika');
      },
      error1 => {
        console.log('błąd');
      }

    );

  }
}

