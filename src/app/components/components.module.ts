import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

//imports de Componentes personalizados
import { FabLoginComponent } from './fab-login/fab-login.component';





@NgModule({
  declarations: [FabLoginComponent,
    ],
  imports: [
    CommonModule,
    IonicModule
  ], exports: [
    FabLoginComponent,
    
  ]

})
export class ComponentsModule { }
