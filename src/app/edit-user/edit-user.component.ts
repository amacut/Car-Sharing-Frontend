import {Component, OnInit} from '@angular/core';
import {UserService} from '../users/user.service';
import {NotificationService} from '../notification.service';
import {MatDialogRef} from '@angular/material/dialog';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(public service: UserService,
              private notificationService: NotificationService,
              private dialog: MatDialogRef<EditUserComponent>) {
  }

  hide = true;
  msg = '';
  id = null;
  exit = faTimes;

  ngOnInit(): void {
    this.id = this.dialog._containerInstance._config.data.response;
  }

  updateUserDetails() {
    if (this.service.form.valid) {
      console.log(this.id);
      this.service.updateUser(this.id, this.service.form.value).subscribe(
        data => {
          console.log('response received');
          this.msg = 'Registration successful';
          this.dialog.close();
          this.notificationService.success('Zaktualizowano dane użytkownika.');
          this.service.form.reset();
          this.service.initializeFormGroup();
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
