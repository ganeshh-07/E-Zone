import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { trigger } from '@angular/animations';
import { login, signUp } from '../../data-type';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError =new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: signUp) {
     
    return this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  
  }
  reloadSeller()
  {
    
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    return this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if(result && result.body && result.body.length)
        {
          localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        }
        else{
          this.isLoginError.emit(true);
        }
      });
  }
}
