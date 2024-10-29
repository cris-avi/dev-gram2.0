import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegCliPageRoutingModule } from './reg-cli-routing.module';

import { RegCliPage } from './reg-cli.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegCliPageRoutingModule,
    SharedModule
  ],
  declarations: [RegCliPage]
})
export class RegCliPageModule {}
