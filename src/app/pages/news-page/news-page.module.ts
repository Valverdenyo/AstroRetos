import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPagePageRoutingModule } from './news-page-routing.module';

import { NewsPagePage } from './news-page.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [NewsPagePage]
})
export class NewsPagePageModule {}
