import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private apiService: DataService){}

  public ProductList:any[] = [];
  public SearchValue: string = "";
  public notFound:boolean = false;

  ngOnInit(): void {
    this.GetProducts();
  }

  public SearchClick(){
    if(this.SearchValue != ""){
      this.ProductList = this.ProductList.filter(data => data.productCategory.productCategoryName.toLowerCase().includes(this.SearchValue.toLowerCase()))
      if(this.ProductList.length == 0){
      this.notFound = true;
      }
    }
  }

  public getList(){
    this.notFound = false;
    this.GetProducts();
    this.SearchValue = "";
  }

  public GetProducts(){
    fetch("https://api.kalpav.com/api/v1/product/category/retail")
    .then(res => res.json())
    .then( data => {
      this.ProductList = data.response;
  })
  }
}
