import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {NotificationService} from '../services/notification.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(public service: UserService,
              private router: Router,
              private notificationService: NotificationService,
              private datePipe: DatePipe) {
  }

  hide = true;
  msg = '';

  ngOnInit(): void {
  }


  registerUser() {
    if (this.service.userForm.valid){
      const registerFormValue = this.service.userForm.value;
      registerFormValue.birthDate = this.datePipe.transform(registerFormValue.birthDate, 'yyyy-MM-dd');
      this.service.registerUser(registerFormValue).subscribe(
        data => {
          console.log('response received');
          this.msg = 'Registration successful';
          this.router.navigate(['/login']);
          this.notificationService.success('Zarejestrowano użytkownika!');
          this.service.userForm.reset();
          this.service.initializeFormGroup();
        },
        error => {
          console.log('exception occured');
          this.notificationService.error('Email jest używany.');
          this.msg = error.error;
        }
      );
    }
  }
/*  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }*/

 /* registerUser() {
    console.log(this.user);
    this.service.registerUserFromRemote(this.user).subscribe(
      data => {
        console.log('response received');
        this.msg = 'Registration successful';
        this.router.navigate(['/login']);
      },
      error => {
        console.log('exception occured');
        this.msg = error.error;
      }
    );
  }*/



}
