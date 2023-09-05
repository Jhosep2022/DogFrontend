import { Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showList = false; // Inicialmente, la lista de imágenes está oculta

  showDogsList() {
    this.showList = !this.showList; // Cambia el estado de showList al hacer clic en el botón
  }
}
