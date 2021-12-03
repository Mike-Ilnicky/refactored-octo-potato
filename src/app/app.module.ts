import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from "@angular/common/http";
import { RatingDirective } from "./directives/rating.directive";
import { RatingComponent } from './product/rating/rating.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpPageComponent,
    MainPageComponent,
    ProductListComponent,
    ProductComponent,
    RatingDirective,
    RatingComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
