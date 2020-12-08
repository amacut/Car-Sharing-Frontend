import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators, NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


}
