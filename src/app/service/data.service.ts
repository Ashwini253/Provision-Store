import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  isLoggedIn = false;

  public GetProducts():Observable<any>{
    return this.http.get<any[]>("https://api.kalpav.com/api/v1/product/category/retail");
  }

  public login(email: string, password: string): Observable<any> {
    let baseUrl = `https://apiv2stg.promilo.com/user/oauth/token`;
    const formData = `username=${email}&password=${password}&grant_type=password`;
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic UHJvbWlsbzpxNCE1NkBaeSN4MiRHQg==');
    return this.http.post<any>(baseUrl, formData, {headers});
  }
}
