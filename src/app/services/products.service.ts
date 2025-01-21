import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  public addProduct(productData: Product, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', productData.price.toString());
    formData.append('category', productData.category);

    if (productData.customFields) {
      formData.append('customFields', JSON.stringify(productData.customFields));
    }

    if (productData.imagePath) {
      formData.append('imagePath', productData.imagePath);
    }

    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    return this.http.post<Product>(`${this.baseUrl}/add`, formData);
  }
}
