import {Injectable} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Observable, pipe} from 'rxjs';
import {LoginComponent} from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  mainUrl = 'http://localhost:8080/';

  userForm: FormGroup = new FormGroup({
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

  public registerUser(user: User): Observable<User> {
    return this.http.post<any>(this.mainUrl + 'registration', user);
  }
// spróbować jako get?
  public loginUser(user: User): Observable<User> {
    return this.http.post<any>(this.mainUrl + 'login', user);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.mainUrl + 'user/' + email);
  }

  public updateUser(id, updateRequest): Observable<User> {
    return this.http.patch<User>(this.mainUrl + id, updateRequest);
  }

  public deleteUser(email: string): Observable<any> {
    console.log(email);
    return this.http.delete<User>(this.mainUrl + email);
  }
  initializeFormGroup(): void {
    this.userForm.setValue({
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

  populateForm(user): void {
    this.userForm.setValue(user);
    console.log(user);
  }
}
