import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  chart: any;

  chartOptions = {}

  constructor(private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private apiService: ApiService,
    private authService: AuthService
  ) { }
  math = Math;

  userStats: any = [{
    _id: 0,
    total: 0
  }]

  orderStats: any = [{
    _id: 0,
    total: 0
  }]

  ngOnInit(): void {
    if (this.router.url === '/dashboard') {
      // var jwtHelper = new JwtHelperService()
      // console.log(this.apiService.token)
      // if (!this.apiService.token || jwtHelper.isTokenExpired(this.apiService.token)) {
      //   this.fetchWithoutToken()
      // } else {
      //   this.fetchWithToken()
      // }
      this.fetchWithToken()
    }
  }

  fetchWithoutToken() {
    this.authService.refresh().subscribe({
      next: (response) => {
        console.log(response, "response")
        this.fetchWithToken()
      },
      error: (error) => console.log(error),
      complete: () => console.log("complete")
    })
  }

  fetchWithToken() {
    //fetch users stats
    this.userService.getUserStats().subscribe({
      next: (response) => {
        this.userStats = response.sort((a: any, b: any) => a._id - b._id)
        this.setChartOptions(this.userStats)
      },
      error: (error) => console.log(error),
      complete: () => console.log(this.userStats, "tesponse")
    })

    // fetch orders stats
    this.orderService.getOrdersStats().subscribe({
      next: (response) => {
        this.orderStats = response.sort((a: any, b: any) => a._id - b._id)
      },
      error: (error) => console.log(error),
      complete: () => console.log(this.userStats, "tesponse")
    })
  }

  setChartOptions(data: any) {
    const dataPoints = []

    for (const item in data) {
      dataPoints.push({
        x: new Date(2022, data[item]._id, 1), y: data[item].total
      })
    }

    this.chartOptions = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "New users graphic",
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        fontWeight: "bold"
      },
      axisY: {
        title: "New users mounthly",
        valueFormatString: "#,###.##"
      },
      data: [{
        type: "spline",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,###.##",
        dataPoints: dataPoints
      }]
    }
  }

}
