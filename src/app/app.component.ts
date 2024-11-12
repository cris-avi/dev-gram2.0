import { Component, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/index', icon: 'home' },
    { title: 'Mi Perfil', url: '/profile', icon: 'person' },
    // { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  firebaseSvc = inject(FirebaseService);

  constructor() {}

  singOut(){

    this.firebaseSvc.singOut();
  }
}
