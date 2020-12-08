import {Injectable} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserResponseInterface} from './userResponseInterface';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getUserByEmail(email: string) {
    return this.http.get<User>(this.url + 'user/' + email);
  }


}
