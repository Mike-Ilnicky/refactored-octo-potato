import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product, RequestsService} from "../services/requests.service";
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  constructor(private requests: RequestsService,
              private router: Router,
              private data: ProductService
              ) { }

  productList: Product[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.requests.getProducts()
      .subscribe(resp => {
        this.productList = resp.map(item => item);
        this.isLoading = false;
        console.log(this.productList);
      })
  }

  openProduct(product: Product) {
    this.data.setData(product);
    this.router.navigate(['/main-page/product']);
  }
}
