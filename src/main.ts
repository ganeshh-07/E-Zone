// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import { HomeComponent } from './app/home/home.component';
// import { SellerAuthComponent } from './app/seller-auth/seller-auth.component';
// import { provideHttpClient } from '@angular/common/http';
// import { SellerHomeComponent } from './app/seller-home/seller-home.component';
// import { RouterModule, Routes } from '@angular/router'
// import { authGuard } from './app/auth.guard';
// import { SellerAddProductComponent } from './app/seller-add-product/seller-add-product.component';
// import { SellerUpdateProductComponent } from './app/seller-update-product/seller-update-product.component';
// import { SearchComponent } from './app/search/search.component';
// import { ProductDetailsComponent } from './app/product-details/product-details.component';
// import { UserAuthComponent } from './app/user-auth/user-auth.component';
// import { CartPageComponent } from './app/cart-page/cart-page.component';
// import { CheckoutComponent } from './app/checkout/checkout.component';
// import { MyOrdersComponent } from './app/my-orders/my-orders.component';
// import { FooterComponent } from './app/footer/footer.component';
// import { routes } from './app/app.routes';
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter([
//       { path: '', component: HomeComponent },
//       { path: 'seller-auth', component: SellerAuthComponent },
//       {
//         path: 'seller-home',
//         component: SellerHomeComponent,
//         canActivate: [authGuard],
//       },
//       {
//         path: 'seller-add-product',
//         component: SellerAddProductComponent,
//         canActivate: [authGuard],
//       },
//       {
//         path: 'seller-update-product/:id',
//         component: SellerUpdateProductComponent,
//         canActivate: [authGuard],
//       },
//       { path: 'search/:query', component: SearchComponent },
//       { path: 'details/:productId', component: ProductDetailsComponent },
//       { path: 'user-auth', component: UserAuthComponent },
//       { path: 'cart-page', component: CartPageComponent },
//       { path: 'checkout', component: CheckoutComponent },
//       { path: 'my-orders', component: MyOrdersComponent },
//       { path : 'footer', component:FooterComponent}
//     ]),
//   ],
// }).catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { authGuard } from './app/auth.guard';
import { routes } from './app/app.routes'; // Use routes from app.routes.ts

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes) // Use centralized routing
  ],
}).catch((err) => console.error(err));
