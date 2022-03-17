import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Breadcrumb, BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  usuarioNome!: string
  breadcrumbs!: Observable<Breadcrumb[]>; 

  constructor(
    private authService: AuthService,
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.usuarioNome = this.authService.userName || ""
    this.breadcrumbs = this.breadcrumbService.breadcrumbs; 
  }

  logout() {
    this.authService.fazerLogout()
  }

}
