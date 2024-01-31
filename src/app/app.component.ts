import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'provision-store';
  IsActive = true;
  public ProductList: any[] = [];
  public SearchValue: string = '';
  public notFound: boolean = false;
  
  constructor(private route: Router, private apiService: DataService) {}

  ngOnInit(): void {
    this.GetProducts();
    const value = sessionStorage.getItem('login');
    if(value == "ok"){
      this.IsActive = false;
    }else{
      this.IsActive = true;
  }
}

  public SearchClick() {
    if (this.SearchValue != '') {
      this.ProductList = this.ProductList.filter((data) =>
        data.productCategory.productCategoryName
          .toLowerCase()
          .includes(this.SearchValue.toLowerCase())
      );
      if (this.ProductList.length == 0) {
        this.notFound = true;
      }
    }
  }

  public getList() {
    this.notFound = false;
    this.GetProducts();
    this.SearchValue = '';
  }

  public GetProducts() {
    fetch('https://api.kalpav.com/api/v1/product/category/retail')
      .then((res) => res.json())
      .then((data) => {
        this.ProductList = data.response;
      });
  }

  public login() {
    this.IsActive = true;
  }

}
