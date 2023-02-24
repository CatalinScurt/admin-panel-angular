import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './login/login.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { OrdersComponent } from './orders/orders.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { isAdmin: true }
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [RoleGuard],
    data: { isAdmin: true }
  },
  {
    path: 'products/:id',
    component: EditProductComponent,
    canActivate: [RoleGuard],
    data: { isAdmin: true }
  },
  {
    path: 'addProduct',
    component: AddProductComponent,
    canActivate: [RoleGuard],
    data: { isAdmin: true }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [RoleGuard],
    data: { isAdmin: true }
  },
  {
    path: 'order/:id',
    component: EditOrderComponent,
    canActivate: [RoleGuard],
    data: { isAdmin: true }
  },
  {
    path: 'addOrder',
    component: AddOrderComponent,
    canActivate: [RoleGuard],
    data: { isAdmin: true }
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RoleGuard],
    data: { isAdmin: true }
  },
  {
    path: 'user/:id',
    component: EditUserComponent,
    canActivate: [RoleGuard],
    data: { isAdmin: true }
  },
  {
    path: 'addUser',
    component: AddUserComponent,
    canActivate: [RoleGuard],
    data: { isAdmin: true }
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
