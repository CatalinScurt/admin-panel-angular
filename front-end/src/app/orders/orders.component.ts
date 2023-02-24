import { Component, OnInit } from '@angular/core';
import { Order } from '../interfaces/Order';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = []
  p: number = 1;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    // var jwtHelper = new JwtHelperService()
    // console.log(this.apiService.token)
    // if (!this.apiService.token || jwtHelper.isTokenExpired(this.apiService.token)) {
    //   this.fetchWithoutToken()
    // } else {
    //   this.fetchWithToken()
    // }

    this.getOrders()

  }

  fetchWithoutToken() {
    this.authService.refresh().subscribe({
      next: (response) => {
        console.log(response, "response")
        this.orderService.getOrders().subscribe({
          next: (response) => this.orders = response,
          error: (error) => console.log(error),
          complete: () => console.log(this.orders, "tesponse")
        })
      },
      error: (error) => console.log(error),
      complete: () => console.log("complete")
    })
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (response) => { this.orders = response },
      error: (error) => console.log(error),
      complete: () => console.log(this.orders, "tesponse")
    })
  }

  deleteItem(id: string) {
    //delete from DB
    const deletedOrder = this.orders.filter(order => order._id !== id)

    this.orderService.deleteOrder(id).subscribe({
      next: (response) => this.orders = response,
      error: (error) => console.log(error),
      complete: () => this.orders = [...deletedOrder]
    })
  }

}
