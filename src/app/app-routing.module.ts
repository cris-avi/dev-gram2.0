import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule), canActivate: [NoAuthGuard]
  },
  // {
  //   path: 'reg-dev',  // Ruta completa hacia reg-dev dentro de select
  //   loadChildren: () => import('./pages/auth/select/reg-dev/reg-dev.module').then(m => m.RegDevPageModule), canActivate: [NoAuthGuard]
  // },
  {
    path: 'reg-cli',  // Ruta completa hacia reg-cli dentro de select
    loadChildren: () => import('./pages/auth/select/reg-cli/reg-cli.module').then(m => m.RegCliPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/main/index/index.module').then( m => m.IndexPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/main/index/profile/profile.module').then( m => m.ProfilePageModule), canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
