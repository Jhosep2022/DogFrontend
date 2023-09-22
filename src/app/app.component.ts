import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  constructor(private router: Router, private keycloakService: KeycloakService, private dialog: MatDialog) {}

  navigateToDogPage() {
    this.router.navigate(['/app-dog']); // Navega a la página App Dog
  }

  navigateToDogListPage() {
    this.router.navigate(['/app-dog-list']); // Navega a la página App Dog List
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: '¿Esta seguro que desea cerrar sesión?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.keycloakService.logout('http://localhost:4200');
      }
    });
  }
}
