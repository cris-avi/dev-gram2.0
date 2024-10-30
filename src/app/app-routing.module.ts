import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'reg-dev',  // Ruta completa hacia reg-dev dentro de select
    loadChildren: () => import('./pages/auth/select/reg-dev/reg-dev.module').then(m => m.RegDevPageModule)
  },
  {
    path: 'reg-cli',  // Ruta completa hacia reg-cli dentro de select
    loadChildren: () => import('./pages/auth/select/reg-cli/reg-cli.module').then(m => m.RegCliPageModule)
  },  {
    path: 'index',
    loadChildren: () => import('./pages/main/index/index.module').then( m => m.IndexPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
