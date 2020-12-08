import {Component, OnInit} from '@angular/core';
import {User} from '../users/user';
import {RegistrationService} from './registration.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private service: RegistrationService,
              private router: Router,
              private http: HttpClient) {
  }

  hide = true;
  user = new User();
  msg = '';

  ngOnInit(): void {
  }

  // registerForm: FormGroup = new FormGroup({
  //   firstName: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required),
  //   gender: new FormControl('', Validators.required),
  //   email: new FormControl('', [Validators.email, Validators.required]),
  //   phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9)]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   birthDate: new FormControl('', Validators.required),
  //   country: new FormControl('', Validators.required),
  //   street: new FormControl('', Validators.required),
  //   houseNoFlatNo: new FormControl('', Validators.required),
  //   postcode: new FormControl('', Validators.required),
  //   city: new FormControl('', Validators.required),
  //   // companyDetails: new FormControl(false),
  //   terms: new FormControl(false)
  // });
  selectedFile = null;
  message = null;

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File> event.target.files[0];
  }

  onUpload() {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost8080/imageupload', uploadImageData, {observe: 'response'})
      .subscribe(response => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        }
        this.message = 'Image not uploaded successfully';
      });
  }

  registerUser() {
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
  }

}
