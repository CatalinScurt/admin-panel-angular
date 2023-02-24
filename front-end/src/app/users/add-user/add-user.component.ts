import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    createdAt: new FormControl('', Validators.required),
    admin: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  id: string = ''
  response = ''

  constructor(private userService: UserService, private router: Router) { }

  user: User = {
    _id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    isAdmin: false,
    createdAt: ''
  }

  ngOnInit(): void {
  }

  submitForm() {
    console.log(this.addForm.value)
    const isAdmin = this.addForm.value.admin === 'true' ? true : false
    this.userService.addUser({ ...this.addForm.value, isAdmin: isAdmin }).subscribe({
      next: response => this.response = response,
      error: error => this.response = error.error.message,
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['/users'])
        }, 3000);
      }
    })

    // this.userService.addUser(
    //   this.addForm.value.firstName || '',
    //   this.addForm.value.lastName || '',
    //   this.addForm.value.username || '',
    //   this.addForm.value.email || '',
    //   this.addForm.value.password || '',
    //   this.addForm.value.admin === 'true' ? true : false).subscribe({
    //     next: response => console.log(response),
    //     error: error => console.log(error),
    //     complete: () => console.log('successfull')
    //   })
  }

}
