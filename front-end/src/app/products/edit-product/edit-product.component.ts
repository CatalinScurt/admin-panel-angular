import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editForm = new FormGroup({
    id: new FormControl('', Validators.required),
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
    images: new FormControl('', Validators.required),
  });

  id: string = ''
  response = ''

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.id = params['id']
    })
  }

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

  arrayImages: string[] = []

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: response => {
        response.filter(item => { if (item._id === this.id) this.product = item })
      }
    })
  }

  submitForm() {
    this.product.images.forEach((element, index) => {
      this.product.images[index] = (document.getElementById('images' + index) as HTMLInputElement).value
    })
    // var newProdut = {}
    // Object.keys(this.product).forEach(key => {
    //   //console.log(key, (document.getElementById(key) as HTMLInputElement)?.value)
    //   // (document.getElementById(key) as HTMLInputElement)?.value.length !== 0 ? this.product[key]
    // })
    // let key: keyof typeof this.product
    // for (key in this.product) {
    //   console.log(this.product[key])

    //   //(document.getElementById(key) as HTMLInputElement)?.value.length !== 0 ? this.product[key] = (document.getElementById(key) as HTMLInputElement).value : 
    // }

    const newProduct = Object.keys(this.product).reduce(
      (attrs, key) => ({
        ...attrs,
        [key]: (document.getElementById(key) as HTMLInputElement)?.value || '',
      }),
      {}
    )

    //console.log(newProduct)


    console.log({ ...newProduct, images: this.product.images, _id: this.id })

    this.productService.updateProduct({ ...newProduct, images: this.product.images, _id: this.id }).subscribe({
      next: response => this.response = response,
      error: error => this.response = error.error.message,
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['/products'])
        }, 3000);
      }
    })


    // this.arrayImages.forEach((element, index) => {
    //   console.log((document.getElementById('images' + index) as HTMLInputElement).value)
    // })
    // //document.getElementsByClassName('images')

  }

  addInput() {
    this.product.images.push('')
  }

}

