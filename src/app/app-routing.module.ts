import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {SignUpPageComponent} from "./sign-up-page/sign-up-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ProductComponent} from "./product/product.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {AuthGuard} from "./auth.guard";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'sign-up-page', component: SignUpPageComponent},
  {path: 'main-page', component: MainPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {path: 'product-list', component: ProductListComponent},
      {path: 'product', component: ProductComponent}
    ]},
  {path: '404', component: NotFoundComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
