import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  constructor(private router: Router) {}

  navigateToDogPage() {
    this.router.navigate(['/app-dog']); // Navega a la página App Dog
  }

  navigateToDogListPage() {
    this.router.navigate(['/app-dog-list']); // Navega a la página App Dog List
  }
}
