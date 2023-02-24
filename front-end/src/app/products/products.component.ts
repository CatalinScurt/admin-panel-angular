import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/Product';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []
  p: number = 1;
  constructor(
    private productService: ProductService,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  fetchWithoutToken() {
    this.authService.refresh().subscribe({
      next: (response) => {
        console.log(response, "response")
        this.productService.getProducts().subscribe({
          next: (response) => this.products = response,
          error: (error) => console.log(error),
          complete: () => console.log(this.products, "response")
        })
      },
      error: (error) => console.log(error),
      complete: () => console.log("complete")
    })
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => this.products = response,
      error: (error) => console.log(error),
      complete: () => console.log(this.products, "response")
    })
  }

  deleteItem(id: string) {
    //delete from DB
    const deletedProduct = this.products.filter(product => product._id !== id)
    //console.log(deletedProduct)

    this.productService.deleteProduct(id).subscribe({
      next: (response) => this.productService = response,
      error: (error) => console.log(error),
      complete: () => this.products = [...deletedProduct]
    })
  }

}
