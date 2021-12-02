import {Injectable} from "@angular/core";
import {Product} from "./requests.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  constructor() {
  }

  product: Product = {
    id: 1,
    title: '',
    text: '',
    img: ''
  }

  stars = 0;

  setData(product: Product) {
    this.product = product;
  }

  getData(): Observable<any> {
    return new Observable<any>( observer => {
      observer.next(this.product);
    });
  }

  setRating(n: number) {
    this.stars = n;
  }

  getRating() {
    return this.stars;
  }
}
