import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/products';
  apiUrl: any;

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  public addProduct(productData: Product, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', productData.price.toString());
    formData.append('stock', productData.price.toString());
    formData.append('category', productData.category);

    if (productData.imagePath) {
      formData.append('imagePath', productData.imagePath);
    }

    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    return this.http.post<Product>(`${this.baseUrl}/add`, formData);
  }

  public updateProduct(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  public getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
