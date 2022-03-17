import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.authService.fazerLogin().catch(error => {
      window.location.reload()
    })
    this.router.navigate([""])
  }

}
