import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  private apiUrl = 'http://localhost:8080';

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      headers: new HttpHeaders({
        Authorization: '12345',
        // 'Access-Control-Allow-Origin': '*'
      })
    });
    return next.handle(newRequest);
  }
}
