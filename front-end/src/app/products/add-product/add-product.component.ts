import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  addForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    discountPercentage: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    seller: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    thumbnail: new FormControl('', Validators.required),
  });

  id: string = ''
  response = ''

  constructor(private productService: ProductService,
    private router: Router) { }

  product: Product = {
    _id: '',
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    seller: '',
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: ['']
  }

  arrayImages: string[] = ['']

  ngOnInit(): void {

  }

  submitForm() {
    // this.productService.addProduct(
    //   this.addForm.value.title || '',
    //   this.addForm.value.description || '',
    //   this.addForm.value.price || '',
    //   this.addForm.value.discount || '',
    //   this.addForm.value.rating || '',
    //   this.addForm.value.seller || '',
    //   this.addForm.value.stock || '',
    //   this.addForm.value.brand || '',
    //   this.addForm.value.category || '',
    // )

    this.arrayImages.forEach((element, index) => {
      this.arrayImages[index] = (document.getElementById('images' + index) as HTMLInputElement).value
      console.log((document.getElementById('images' + index) as HTMLInputElement).value)
    })

    this.productService.addProduct(this.addForm.value, this.arrayImages).subscribe({
      next: response => this.response = response,
      error: error => this.response = error.error.message,
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['/products'])
        }, 3000);
      }
    })

  }

  addInput() {
    this.arrayImages.push('')
  }

}


