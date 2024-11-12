import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
// export class ForgotPasswordPage implements OnInit {
export class ForgotPasswordPage {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  // ngOnInit() {  
  // }

  async submit() {
    if (this.form.valid){

      const loadin = await this.utilsSvc.loading();
      await loadin.present();

      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res=>{

        
        this.utilsSvc.presentToast({
          message: 'Correo enviado con exito',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

        this.utilsSvc.routerLink('/auth');
        this.form.reset();
        
      }).catch(err=>{
        console.log(err);

        this.utilsSvc.presentToast({
          message: err.message,
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      }).finally(()=>{
        loadin.dismiss();
      });
    }
  }

}

