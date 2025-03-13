import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  inValidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(user: signUp) {
    this.http
      .post(`${environment.apiUrl}/users`, user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }

  userLogin(data: login) {
    this.http
      .get<signUp[]>(
        `${environment.apiUrl}/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body?.length) {
          this.inValidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        } else {
          this.inValidUserAuth.emit(true);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
