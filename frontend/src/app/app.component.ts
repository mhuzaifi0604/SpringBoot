import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anglar-login-signup-form';
  showNavbar: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/login');
      }
    });
  }
  logout(){
    this.router.navigate(['/login']).then(() => {
      // Add a new state
      window.history.pushState(null, '', '/login');
      // Replace the current state
      window.history.pushState(null, '', '/login');
      // Go back to the new state
      window.history.back();

      this.location.replaceState('/login'); // clear browser history
    });
  }
}