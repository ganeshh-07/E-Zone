import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../../data-type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchResult: product[] | undefined = undefined;

constructor(private activeRoute:ActivatedRoute, private product:ProductService){}
// ngOnInit():void{
// let query=this.activeRoute.snapshot.paramMap.get('query');
// query && this.product.searchProducts(query).subscribe((result)=>{
// this.searchResult=result
// });
// }
ngOnInit(): void {
  this.activeRoute.paramMap.subscribe((paramMap) => {
    const query = paramMap.get('query'); // Dynamically listens for route changes
    if (query) {
      this.product.searchProducts(query).subscribe((result) => {
        this.searchResult = result; // Updates dynamically
      });
    }
  });
}

}
