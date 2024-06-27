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
        this.showNavbar = !event.url.includes('/Login');
      }
    });
  }
  logout(){
    this.router.navigate(['/Login']).then(() => {
      // Add a new state
      window.history.pushState(null, '', '/Login');
      // Replace the current state
      window.history.pushState(null, '', '/Login');
      // Go back to the new state
      window.history.back();

      this.location.replaceState('/Login'); // clear browser history
    });
  }
}