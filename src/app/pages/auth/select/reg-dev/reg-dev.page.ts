import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-reg-dev',
  templateUrl: './reg-dev.page.html',
  styleUrls: ['./reg-dev.page.scss'],
})
// export class RegDevPage implements OnInit {
export class RegDevPage {


  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    speciality: new FormControl('', [Validators.required]),
    userType: new FormControl(''),

  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  // ngOnInit() {
  // }

  async submit() {
    if (this.form.valid) {

      const loadin = await this.utilsSvc.loading();
      await loadin.present();

      this.firebaseSvc.registerDeveloper(this.form.value as User).then(async res => {

        await this.firebaseSvc.updateUser(this.form.value.name);

        let uid = res.user.uid;
        let userType = 'Desarrollador';
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid, userType);

      }).catch(err => {
        console.log(err);

        this.utilsSvc.presentToast({
          message: err.message,
          duration: 3000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      }).finally(() => {
        loadin.dismiss();
      });
    }
  }


  async setUserInfo(uid:string, userType:string) {
    if (this.form.valid) {

      const loadin = await this.utilsSvc.loading();
      await loadin.present();

      let path = `users/${uid}`
      delete this.form.value.password;
      this.form.value.userType = "Desarrollador";

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

        this.utilsSvc.saveInLocalStorage('user', this.form.value);
        this.utilsSvc.routerLink('/index');

        this.form.reset();


      }).catch(err => {
        console.log(err);

        this.utilsSvc.presentToast({
          message: err.message,
          duration: 3000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      }).finally(() => {
        loadin.dismiss();
      });
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {

      const loadin = await this.utilsSvc.loading();
      await loadin.present();


    }
  }

}
