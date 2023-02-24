import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  error = false
  dashboard = true

  constructor(
    public productService: ProductService,
    private router: Router) {
    this.router.url === '/dashboard' ? this.dashboard = true : this.dashboard = false
  }

  ngOnInit(): void {
  }

}
