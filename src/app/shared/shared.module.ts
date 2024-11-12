import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListComponent } from './components/user-list/user-list.component';



@NgModule({
  declarations: [
    HeaderComponent, 
    CustomInputComponent,
    LogoComponent,
    UserCardComponent,
    UserListComponent,
  ],
  exports: [
    HeaderComponent, 
    CustomInputComponent,
    LogoComponent,
    ReactiveFormsModule,
    UserCardComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
