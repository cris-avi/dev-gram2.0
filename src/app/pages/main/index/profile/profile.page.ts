import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../../../../services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  // ngOnInit() {
  // }
  user: User;

  async ionViewWillEnter() {
    await this.getUser();
  }

  async getUser() {
    const userId = await this.firebaseSvc.getCurrentUserId();
  
    if (!userId) {
      console.error('No se pudo obtener el ID del usuario autenticado.');
      return;
    }
  
    const path = `users/${userId}`;
    this.user = await this.firebaseSvc.getDocument(path) as User;
  
    if (!this.user) {
      console.error('No se encontró el documento del usuario.');
      return;
    }
  
    console.log('Usuario obtenido:', this.user.name);
  }

  
  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const userId = await this.firebaseSvc.getCurrentUserId(); // Cambia esto con el UID actual del usuario
      this.firebaseSvc.uploadProfilePicture(file, userId).then(url => {
        console.log('URL de la foto de perfil:', url);
        // Aquí puedes actualizar el estado o mostrar un mensaje al usuario
      });
    }
}
}
