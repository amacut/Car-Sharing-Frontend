import {Injectable} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UsersResponseInterface} from './usersResponseInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/users';

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




}
