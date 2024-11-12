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
}
