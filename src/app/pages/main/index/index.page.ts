import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UserListComponent } from 'src/app/shared/components/user-list/user-list.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
// export class IndexPage implements OnInit {
export class IndexPage {


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  // ngOnInit() {

  // }

  @ViewChild(UserListComponent) userListComponent: UserListComponent;

  // Método para refrescar desde el `ion-refresher`
  async handleRefresh(event) {
    await this.userListComponent.handleRefresh(event);
  }

  // Completa el refresher cuando el `refreshComplete` es emitido
  onRefreshComplete(event) {
    event.target.complete();
  }

  singOut(){

    this.firebaseSvc.singOut();
  }
}
