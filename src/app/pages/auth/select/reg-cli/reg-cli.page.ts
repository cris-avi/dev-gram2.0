import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-reg-cli',
  templateUrl: './reg-cli.page.html',
  styleUrls: ['./reg-cli.page.scss'],
})
// export class RegCliPage implements OnInit {
export class RegCliPage {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
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

      this.firebaseSvc.registerClient(this.form.value as User).then(async res => {

        await this.firebaseSvc.updateUser(this.form.value.name);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid);

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


  async setUserInfo(uid:string) {
    if (this.form.valid) {

      const loadin = await this.utilsSvc.loading();
      await loadin.present();

      let path = `users/${uid}`
      delete this.form.value.password;
      this.form.value.userType = "Cliente";

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
