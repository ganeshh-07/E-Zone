import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { ProductService } from '../services/product.service';
import { product } from '../../data-type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule,CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  popularProducts:undefined | product[];
  trendyProducts:undefined | product[];
   constructor(private product :ProductService){}


   ngOnInit(): void {
    this.product.popularProducts().subscribe(
      (data)=>{
      console.warn(data);
    this.popularProducts=data;
    });

    this.product.trendyProducts().subscribe(
      (data)=>{
        console.warn(data);
      this.trendyProducts=data;
    })

    }


  
}
