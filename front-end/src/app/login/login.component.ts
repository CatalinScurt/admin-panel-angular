import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService) { }

  get username() {
    return this.loginForm.get('username')
  }
  get password() {
    return this.loginForm.get('password')
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.authService.login(this.loginForm.value.username || '', this.loginForm.value.password || '')
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => this.apiService.error = error.statusText,
        complete: () => this.router.navigate(['/dashboard'])
      })

  }

}
