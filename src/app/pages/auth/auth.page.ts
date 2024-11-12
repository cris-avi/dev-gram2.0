import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { User } from 'src/app/models/user.model';

import { ModalController } from '@ionic/angular';
import { WelcomeModalComponent } from 'src/app/shared/components/welcome-modal/welcome-modal.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private modalController: ModalController) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  async ionViewDidEnter() {
    const modal = await this.modalController.create({
      component: WelcomeModalComponent,
      cssClass: 'welcome-modal'
    });
    await modal.present();
  }

  async submit() {
    if (this.form.valid){

      const loadin = await this.utilsSvc.loading();
      await loadin.present();

      this.firebaseSvc.signIn(this.form.value as User).then(res=>{

        this.utilsSvc.saveInLocalStorage('user', this.form.value);
        this.utilsSvc.routerLink('/index');

        this.form.reset();
        console.log(res);
        
      }).catch(err=>{
        console.log(err);

        this.utilsSvc.presentToast({
          message: err.message,
          duration: 3000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      }).finally(()=>{
        loadin.dismiss();
      });
    }
  }

  async getUserInfo(uid: string){
    if (this.form.valid){
        
        const loadin = await this.utilsSvc.loading();
        await loadin.present();
  
        
    }
  }
}
