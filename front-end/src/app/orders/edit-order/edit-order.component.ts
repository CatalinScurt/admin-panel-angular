import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/Order';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  editForm = new FormGroup({
    username: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    createdAt: new FormControl('', Validators.required),
  });

  id: string = ''
  response = ''

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.id = params['id']
    })
  }

  order: Order = {
    _id: '',
    user: '',
    products: [{
      productId: '',
      quantity: 0
    }],
    amount: 0,
    address: '',
    status: '',
    createdAt: '',
    username: '',
    productsTitle: ['']
  }

  products: any = []
  numberOfProducts: string[] = ['']
  quantitiesArray: number[] = [0]

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: response => {
        response.filter((item: Order) => { if (item._id === this.id) this.order = item })
      }
    })
  }

  submitForm() {
    //push in @products all products + their quantity
    this.order.productsTitle.forEach((element, index) => {
      const productTitle = (document.getElementById('product' + index) as HTMLInputElement)?.value
      const quantity = parseInt((document.getElementById('quantity' + index) as HTMLInputElement)?.value)
      this.products.push({ productTitle: productTitle, quantity: quantity })
    })

    const newOrder = Object.keys(this.order).reduce(
      (attrs, key) => ({
        ...attrs,
        [key]: (document.getElementById(key) as HTMLInputElement)?.value || '',
      }),
      {}
    )

    // //search product in products list and get it's _id

    // var newProducts = []
    // const produductsId: string[] = []
    // this.productService.getProducts().subscribe(response => {
    //   // const product = response.filter(product => {

    //   // })
    //   newProducts = this.products.map((product: any) => response.filter(item => item.title === product.productTitle))
    //   newProducts.forEach((element: any[]) => {
    //     produductsId.push(element[0]._id)
    //   });

    // })

    this.orderService.editOrder({ ...newOrder, products: this.products, _id: this.id }).subscribe({
      next: response => this.response = response,
      error: error => this.response = error.error.message,
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['/orders'])
        }, 3000);
      }
    })

    console.log({ ...newOrder, products: this.products, _id: this.id })
  }
  addInput() {
    this.order.productsTitle.push('')
  }
}
