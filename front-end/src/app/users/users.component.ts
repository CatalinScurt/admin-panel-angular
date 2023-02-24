import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../interfaces/User';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = []
  p: number = 1
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router

  ) { }

  ngOnInit(): void {
    // var jwtHelper = new JwtHelperService()
    // console.log(this.apiService.token)
    // if (!this.apiService.token || jwtHelper.isTokenExpired(this.apiService.token)) {
    //   this.fetchWithoutToken()
    // } else {
    //   this.fetchWithToken()
    // }

    this.getUsers()
  }

  // fetchWithoutToken() {
  //   this.authService.refresh().subscribe({
  //     next: (response) => {
  //       console.log(response, "response")
  //       this.fetchWithToken()
  //     },
  //     error: (error) => console.log(error),
  //     complete: () => console.log("complete")
  //   })
  // }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => this.users = response,
      error: (error) => console.log(error),
      complete: () => console.log(this.users, "tesponse")
    })
  }

  deleteItem(id: string) {
    //delete from DB
    const deletedUser = this.users.filter(user => user._id !== id)
    console.log(deletedUser)
    this.userService.deleteUser(id).subscribe({
      next: (response) => this.users = response,
      error: (error) => console.log(error),
      complete: () => this.users = [...deletedUser]
    })
  }

}

// email
// : 
// "test@email.com"
// firstName
// : 
// "firstTest"
// isAdmin
// : 
// false
// lastName
// : 
// "lastTest"
// updatedAt
// : 
// "2022-11-04T11:21:02.526Z"
// username
// : 
// "test"