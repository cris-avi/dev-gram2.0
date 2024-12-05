import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'select',
    loadChildren: () => import('./select/select.module').then( m => m.SelectPageModule)
  },
  {
    path: 'reg-dev',  // Ruta completa hacia reg-dev dentro de select
    loadChildren: () => import('./select/reg-dev/reg-dev.module').then(m => m.RegDevPageModule), canActivate: [NoAuthGuard]
  },  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
