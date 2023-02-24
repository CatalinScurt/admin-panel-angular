import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User = {
    _id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    isAdmin: false,
    createdAt: ''
  }

  editForm = new FormGroup({
    username: new FormControl(this.user.username, Validators.required),
    email: new FormControl(this.user.email, Validators.required),
    password: new FormControl('', Validators.required),
    isAdmin: new FormControl(this.user.isAdmin, Validators.required),
    firstName: new FormControl(this.user.firstName, Validators.required),
    lastName: new FormControl(this.user.lastName, Validators.required),
  });

  id: string = ''
  response = ''

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.id = params['id']
    })
  }


  arrayImages: string[] = []

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: response => {
        response.filter((item: User) => { if (item._id === this.id) this.user = item })
      }
    })
  }

  submitForm() {
    const newUser = Object.keys(this.user).reduce(
      (attrs, key) => ({
        ...attrs,
        [key]: (document.getElementById(key) as HTMLInputElement)?.value || '',
      }),
      {}
    )

    const newPassword = (document.getElementById('password') as HTMLInputElement)?.value || null

    this.userService.updateUser({ ...newUser, _id: this.id, password: newPassword }).subscribe({
      next: response => this.response = response,
      error: error => this.response = error.error.message,
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['/users'])
        }, 3000);
      }
    })
    // this.userService.updateUser({ id: this.id, ...this.editForm.value }).subscribe({
    //   next: response => console.log(response),
    //   error: error => console.log(error),
    //   complete: () => console.log('successfull')
    // })
  }

}
