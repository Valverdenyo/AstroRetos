import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

//imports de Componentes personalizadso
import { FabLoginComponent } from './fab-login/fab-login.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';




@NgModule({
  declarations: [FabLoginComponent,
    ModalLoginComponent],
  imports: [
    CommonModule,
    IonicModule
  ], exports: [
    FabLoginComponent,
    ModalLoginComponent
  ]

})
export class ComponentsModule { }
