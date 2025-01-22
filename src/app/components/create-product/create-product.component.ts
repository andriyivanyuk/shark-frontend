import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from '../../services/products.service';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-product',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
  ],
  providers: [ProductService],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [
        null,
        [Validators.required, Validators.pattern(/^\d+\.?\d{0,2}$/)],
      ],
      category: ['', Validators.required],
      stock: [null, [Validators.required]],
      image: [null, Validators.required],
    });
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    this.productForm.patchValue({ image: file });
  }

  public submitProduct(): void {
    if (this.productForm.valid) {
      const { title, description, price, category, stock } =
        this.productForm.value;
      const imageControl = this.productForm.get('image');

      if (imageControl && imageControl.value) {
        const image = imageControl.value;
        this.productService
          .addProduct(
            {
              title,
              description,
              price,
              category,
              stock,
            },
            image
          )
          .subscribe({
            next: () => {
              this.productForm.reset();
            },
            error: (error) => console.error('Error adding product:', error),
          });
      }
    }
  }
}
