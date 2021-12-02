import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";

export interface Product {
  id: number,
  title: string,
  img: string,
  text: string
}

export interface Review {
  rate: number,
  text: string,
}

export interface Reviews {
  created_at: string // "2013-12-19T00:00:00Z"
  created_by: {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string
  }
  id: number
  product: number
  rate: number
  text: string
}

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  _token = '';

  authSignIn(auth: object): Observable<any> {
    return this.http.post('https://smktesting.herokuapp.com/api/login/', auth).pipe(delay(200));
  }

  authSingUp(auth: object): Observable<any> {
    return this.http.post('https://smktesting.herokuapp.com/api/register/', auth).pipe(delay(200));
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>('https://smktesting.herokuapp.com/api/products/', {
        headers: new HttpHeaders({Authorization: this._token,})
      }
    ).pipe(delay(200));
  }

  getProductReviews(id: string): Observable<any> {
    console.log(this._token);
    return this.http.get(`https://smktesting.herokuapp.com/api/reviews/${id}`,{
      headers: new HttpHeaders({Authorization: this._token,})
    });
  }

  sendProductReviews(obj: Review, id: number) {
    console.log(this._token);
    let send = obj;
    console.log(send);

    return this.http.post(`https://smktesting.herokuapp.com/api/reviews/${id}`, send, {
      headers: new HttpHeaders({Authorization: this._token,})
    });
  }
}
