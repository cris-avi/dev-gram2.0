import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  implements OnInit {

  users: User[] = []; // Aquí almacenamos la lista de usuarios

  @Output() refreshComplete = new EventEmitter<void>();

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    // Llama al método getCollection para traer los usuarios
    await this.loadUsers();
  }
    async loadUsers() {
    this.users = await this.firebaseService.getCollection('users');
    console.log('Usuarios obtenidos:', this.users);
    }

    async handleRefresh(event) {
      await this.loadUsers(); // Vuelve a cargar los usuarios
      this.refreshComplete.emit();
      event.target.complete();
    }
}
