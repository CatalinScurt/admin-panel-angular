import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class OrderService {

    constructor(private apiService: ApiService) { }

    getOrders(): Observable<any[]> {
        return this.apiService.get(`/orders`)
    }

    addOrder(order: any, products: any) {
        return this.apiService.post('/orders', { ...order, products: products }).pipe(
            tap((response: any) => {
                console.log(response, "added")
            }))
    }

    editOrder(order: any) {
        return this.apiService.update('/orders', order).pipe(
            tap((response: any) => {
                console.log(response, "added")
            }))
    }

    deleteOrder(id: string) {
        return this.apiService.delete('/orders', id).pipe(
            tap((response: any) => {
                console.log(response, "delete")
            })
        )
    }

    getOrdersStats() {
        return this.apiService.get('/orders/stats').pipe(
            tap((response: any) => {
                console.log(response, "order status")
            })
        )
    }
}