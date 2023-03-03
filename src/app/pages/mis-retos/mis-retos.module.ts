import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisRetosPageRoutingModule } from './mis-retos-routing.module';

import { MisRetosPage } from './mis-retos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisRetosPageRoutingModule
  ],
  declarations: [MisRetosPage]
})
export class MisRetosPageModule {}
