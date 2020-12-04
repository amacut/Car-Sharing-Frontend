import {Injectable} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UsersResponseInterface} from './usersResponseInterface';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  /*  getUserDetails(userEmail, password) {
      return this.http.post(this.url, {
        userEmail,
        password
      }).subscribe(data => {
        console.log(data, 'is what we got from backend');
      });
    }*/

  getUsers() {
    return this.http.get<UsersResponseInterface[]>(this.url + '/all');
  }

  getUser(id: number) {
    return this.http.get<UsersResponseInterface>(this.url + '/' + id);
  }

  getUserByEmail(email: string) {
    return this.http.get<User>(this.url + 'user/' + email);
  }


}
