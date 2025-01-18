import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../../data-type';
import { CommonModule } from '@angular/common';
import { routes } from '../app.routes';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  constructor(private product: ProductService) {}
  productList:undefined | product[];
  productMessage:undefined | string;
  ngOnInit(): void {
   this.list();
  }
  deleteProduct(id:string)
  {
    console.warn("Test Id",id);
    this.product.deleteProduct(id.toString()).subscribe((result)=>{
      if(result)
      {
        this.productMessage+"Product Deleted Succesfully."
        this.list();
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined},3000);
  }
list()
{
  this.product.productList().subscribe((result)=>{
    if(result)
    {
    this.productList=result;
    }
  })
}
}