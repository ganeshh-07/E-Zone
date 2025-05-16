import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../../data-type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) {}

  addProduct(data: product) {
    return this.http.post(`${environment.apiUrl}/products`, data);
  }

  productList() {
    return this.http.get<product[]>(`${environment.apiUrl}/products`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`${environment.apiUrl}/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(`${environment.apiUrl}/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<product[]>(`${environment.apiUrl}/products?_limit=3`);
  }

  trendyProducts() {
    return this.http.get<product[]>(`${environment.apiUrl}/products?_limit=100`);
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`${environment.apiUrl}/products?q=${query}`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post(`${environment.apiUrl}/cart`, cartData);
  }

  getCartList(userId: number) {
    return this.http.get<product[]>(`${environment.apiUrl}/cart?userId=${userId}`, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete(`${environment.apiUrl}/cart/${cartId}`);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`${environment.apiUrl}/cart?userId=${userData.id}`);
  }

  orderNow(data: order) {
    return this.http.post(`${environment.apiUrl}/orders`, data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`${environment.apiUrl}/orders?userId=${userData.id}`);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(`${environment.apiUrl}/cart/${cartId}`, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.cartData.emit([]);
        }
      });
  }

  cancelOrder(orderId: number) {
    return this.http.delete(`${environment.apiUrl}/orders/${orderId}`);
  }
}
