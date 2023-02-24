import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  constructor(private orderService: OrderService,
    private router: Router) { }

  addForm = new FormGroup({
    user: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  id: string = ''
  response = ''

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

  product = {
    productId: '',
    quantity: 0
  }

  products: any = []

  numberOfProducts: string[] = ['']
  quantitiesArray: number[] = [0]

  ngOnInit(): void {
  }

  submitForm() {
    this.numberOfProducts.forEach((element, index) => {
      const productId = (document.getElementById('product' + index) as HTMLInputElement).value
      const quantity = parseInt((document.getElementById('quantity' + index) as HTMLInputElement).value)
      this.products.push({ productId: productId, quantity: quantity })
    })

    this.orderService.addOrder(this.addForm.value, this.products).subscribe({
      next: response => this.response = response,
      error: error => this.response = error.error.message,
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['/orders'])
        }, 3000);
      }
    })
  }
  addInput() {
    this.numberOfProducts.push('')
  }

}
