import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {NotificationService} from '../services/notification.service';
import {MatDialogRef} from '@angular/material/dialog';

import {DialogService} from '../services/dialog.service';
import {DatePipe} from '@angular/common';
import {FortAwesomeService} from '../shared/fort-awesome/fort-awesome.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(public service: UserService,
              private notificationService: NotificationService,
              private dialog: MatDialogRef<EditUserComponent>,
              private dialogService: DialogService,
              private datePipe: DatePipe,
              public icons: FortAwesomeService,
              private router: Router) {
  }

  hide = true;
  msg = '';
  id = null;
  exitIcon = this.icons.exit;

  ngOnInit(): void {
    this.id = this.dialog._containerInstance._config.data.response;
  }

  updateUserDetails() {
    if (this.service.userForm.valid) {
      console.log(this.id);
      const updateFormValue = this.service.userForm.value;
      updateFormValue.birthDate = this.datePipe.transform(updateFormValue.birthDate, 'yyyy-MM-dd');
      this.service.updateUser(this.id, updateFormValue).subscribe(
        data => {
          console.log('response received');
          this.msg = 'Registration successful';
          this.dialog.close();
          this.notificationService.success('Zaktualizowano dane użytkownika.');
          this.service.userForm.reset();
          this.service.initializeFormGroup();
          this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/account']);
          });
        },
        error => {
          console.log('exception occured');
          this.notificationService.error('Email jest używany.');
        }
      );
    }
  }

  close() {
    this.dialog.close();
  }

}
