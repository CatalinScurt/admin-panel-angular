import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut().subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => {
        this.apiService.token = null
        this.router.navigate([''])
      }
    }
    )
  }
}
