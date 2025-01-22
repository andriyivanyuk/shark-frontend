import { Component, OnInit } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { NavItem } from '../../models/nav-item';
import { navItems } from '../../utils/nav-items';
import { MenuListItemComponent } from '../../components/menu-list-item/menu-list-item.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MenuListItemComponent,
    MatButtonModule,
  ],
  providers: [AuthService],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  public navItems: NavItem[] = navItems;

  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
