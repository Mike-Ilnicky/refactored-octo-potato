import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, Review, RequestsService, Reviews} from "../services/requests.service";
import {ProductService} from "../services/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RatingComponent} from "./rating/rating.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    img: '',
    text: '',
  };

  submitData: Review = {
    rate: 0,
    text: '',
  };

  form: FormGroup =  new FormGroup({
    textArea: new FormControl(null)
  });

  errorMsg = '';
  loading = false;
  reviews: Reviews[] = [];
  noReviews = false;

  @ViewChild(RatingComponent, { static: false }) ratingComponent: RatingComponent | null = null;

  constructor(
    private request: RequestsService,
    private data: ProductService,
  ) {  }

  ngOnInit(): void {
    this.form = new FormGroup({
      textArea: new FormControl('',[Validators.required])
    });

    this.loading = true;
    this.getProducts().then(()=> {
      setTimeout(()=>{
        this.getReviews(this.product.id.toString());
        console.log('this.product: ', this.product);
      }, 2000);
    });
  }

  async getProducts() {
    setTimeout(()=>{
      this.data.getData().subscribe(resp => {
        this.product = resp;
      });
    }, 1);
  }

  getReviews(id: string) {
    this.loading = true;
    this.request.getProductReviews(id).subscribe(resp => {
      this.reviews = resp;
      console.log(this.reviews);
      this.loading = false;
    }, error => {
      this.noReviews = true;
      this.loading = false;
    });
  }

  resetRating() {
    this.ratingComponent?.update();
  }

  addReview() {
    this.submitData = {
      rate: this.data.getRating(),
      text: this.form.get('textArea')?.value,
    }

    this.request.sendProductReviews(this.submitData, this.product.id).subscribe(resp => {
      console.log(this.submitData);
      this.resetRating();
      this.form.get('textArea')?.reset()
    }, error => {
      this.errorMsg = error.status + ' ' + error.statusText;
    });
  }
}
