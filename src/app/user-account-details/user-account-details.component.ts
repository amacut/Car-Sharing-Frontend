import {Component, OnInit} from '@angular/core';

import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {NotificationService} from '../services/notification.service';
import {DialogService} from '../services/dialog.service';
import {User} from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user-account-details.component.html',
  styleUrls: ['./user-account-details.component.css']
})
export class UserAccountDetailsComponent implements OnInit {
  hide = true;
  public user: User;


  constructor(public service: UserService,
              private cookies: CookieService,
              private loginComponent: LoginComponent,
              private router: Router,
              private dialog: MatDialog,
              private notification: NotificationService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    const email = this.cookies.get('email');
    this.service.getUserByEmail(email).subscribe(
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
      response: this.user.id
    };
    this.dialog.open(EditUserComponent, dialogConfig);
  }

  deleteUser() {
    this.dialogService.openConfirmDialog('Czy jesteś pewny, że chcesz usunąć konto?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteUser(this.user.email).subscribe(
          data => {
            console.log('ok');
            this.loginComponent.logoutUser();
            this.notification.success('Usunięto użytkownika');
          },
          error1 => {
            console.log('błąd');
          });
      }
    });

  }
}

