import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData:product| undefined;
  productMessage:undefined | string;
  constructor(private route:ActivatedRoute, private product:ProductService){}

  ngOnInit():void{
    let productId=this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((data)=>{
      this.productData=data;
    })
  }
  submit(data:any)
  {
    console.warn(data);
    if(this.productData)
    {
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result)
      {
        this.productMessage="Product has updated";
      }
    });
    setTimeout(()=>{
      this.productMessage=undefined
    },3000)

  }
}
