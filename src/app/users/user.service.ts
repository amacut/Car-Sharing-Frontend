import {Injectable} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserResponseInterface} from './userResponseInterface';
import {User} from './user';
import {Observable} from 'rxjs';
import {LoginComponent} from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mainUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }
  public registerUserFromRemote(user: User): Observable<any> {
    return this.http.post<any>(this.mainUrl + 'registration', user);
  }

  public loginUserFromRemote(user: User): Observable<any> {
    return this.http.post<any>(this.mainUrl + 'login', user);
  }

  public getUserByEmail(email: string): Observable<any> {
    return this.http.get<User>(this.mainUrl + 'user/' + email);
  }

  public updateUser(id, updateRequest): Observable<any> {
    return this.http.patch<User>(this.mainUrl + id, updateRequest);
  }

  public deleteUser(email: string) {
    console.log(email);
    return this.http.delete(this.mainUrl + email);
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    houseNoFlatNo: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      phoneNumber: '',
      password: '',
      birthDate: '',
      country: '',
      street: '',
      houseNoFlatNo: '',
      postcode: '',
      city: ''
    });
  }

  populateForm(user) {
    this.form.setValue(user);
    console.log(user);
  }
}
