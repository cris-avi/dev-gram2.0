import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaPageRoutingModule } from './mapa-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


import { MapaPage } from './mapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageRoutingModule,
    SharedModule,
    MapaPage
  ],
  // declarations: [MapaPage]
})
export class MapaPageModule {}
