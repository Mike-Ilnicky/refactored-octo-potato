import { Component } from '@angular/core';
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})

export class RatingComponent {
  constructor( private productRating: ProductService) {}
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  showValue: number = 0;

  update() {
    this.selectedValue = this.showValue = 0;
    this.countStar(this.selectedValue);
  }

  countStar(star: number) {
    this.selectedValue = star;
    this.productRating.setRating(this.selectedValue);
  }

  addClass(star: number) {
    this.showValue = star;
    // let elId = "";
    // if (this.selectedValue != 0) {
    //   for (let i = 0 ; i < 5; i++) {
    //     elId = "starId" + i;
    //     document.getElementById(elId)?.classList.remove("rating-color");
    //   }
    // }
    // for (let i = 0; i < star; i++) {
    //   elId = "starId" + i;
    //   document.getElementById(elId)?.classList.add("rating-color");
    // }
  }

  removeClass() {
    this.showValue = this.selectedValue;
    // let elId = "";
    // for (let i = 0 ; i < 5; i++) {
    //   elId = "starId" + i;
    //   document.getElementById(elId)?.classList.remove("rating-color");
    // }
    // for (let i = 0; i <= this.selectedValue -1; i++) {
    //   console.log("star i", star);
    //   elId = "starId" + i;
    //   document.getElementById(elId)?.classList.add("rating-color");
    // }
  }
}
