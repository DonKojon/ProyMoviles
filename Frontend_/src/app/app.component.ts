import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Frontend_';
  showNavbar: boolean = false;
  isNavbarCollapsed: boolean = false;
  private routerSubscription: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const normalizedUrl = event.urlAfterRedirects.replace(/\/+$/, '');
      this.showNavbar = normalizedUrl !== '/login';
    });
  }

  onNavbarCollapsedChange(collapsed: boolean) {
    this.isNavbarCollapsed = collapsed;
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
