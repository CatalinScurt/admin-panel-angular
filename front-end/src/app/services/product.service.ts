import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class ProductService {

    constructor(private apiService: ApiService) { }

    getProducts(): Observable<any[]> {
        return this.apiService.get(`/products`)
    }

    addProduct(product: any, images: string[]) {
        return this.apiService.post('/products', { ...product, images: images }).pipe(
            tap((response: any) => {
                console.log(response, "added")
            }))
    }

    updateProduct(product: any) {
        return this.apiService.update('/products', product).pipe(
            tap((response: any) => {
                console.log(response, "added")
            })
        )
    }

    deleteProduct(id: string) {
        return this.apiService.delete('/products', id).pipe(
            tap((response: any) => {
                console.log(response, "delete")
            })
        )
    }
}