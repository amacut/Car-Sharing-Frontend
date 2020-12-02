import {Injectable} from '@angular/core';
import {User} from './user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  mainUrl = 'http://localhost:8080';

  public loginUserFromRemote(user: User): Observable<any> {
    return this.http.post<any>(this.mainUrl + '/login', user);
  }

  public registerUserFromRemote(user: User): Observable<any> {
    console.log(user);
    return this.http.post<any>(this.mainUrl + '/registeruser', user);
  }

  handleError(error: Response) {
  }
}
