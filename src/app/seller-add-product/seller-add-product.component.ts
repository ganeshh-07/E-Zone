import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined;
  constructor(private product:ProductService){}
  submit(data:product)
  {
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result)
      {
        this.addProductMessage="Product added successfully!!"
      }
      setTimeout(()=>(this.addProductMessage=undefined),3000);
    })
  }
}
