import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { AboutComponent } from './component/about/about.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:"",component:LoginComponent },
  {path: 'login', component: LoginComponent },
  {path: 'list', component: ProductListComponent },
  {path: 'about', component: AboutComponent},
  {path: 'appcomp', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
