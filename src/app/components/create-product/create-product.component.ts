import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from '../../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CreateFieldDialogComponent } from '../dialogs/create-field-dialog/create-field-dialog.component';
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
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;
  customFields: { name: string; type: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.productService.getProducts().subscribe((res) => {
      console.log(res);
    });
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
      image: [null, Validators.required],
    });
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    this.productForm.patchValue({ image: file });
  }

  public submitProduct(): void {
    if (this.productForm.valid) {
      const { title, description, price, category } = this.productForm.value;
      const imageControl = this.productForm.get('image');

      const customFieldsValues: { [key: string]: any } = {};

      this.customFields.forEach((field) => {
        customFieldsValues[field.name] = this.productForm.get(
          field.name
        )?.value;
      });

      if (imageControl && imageControl.value) {
        const image = imageControl.value;
        this.productService
          .addProduct(
            {
              title,
              description,
              price,
              category,
              customFields: customFieldsValues,
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

  public addCustomField(fieldName: string, fieldType: string = 'text'): void {
    if (fieldName && !this.productForm.contains(fieldName)) {
      this.customFields.push({ name: fieldName, type: fieldType });
      this.productForm.addControl(
        fieldName,
        new FormControl('', Validators.required)
      );
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateFieldDialogComponent, {
      width: '420px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.fieldName) {
        this.addCustomField(result.fieldName);
      }
    });
  }
}
