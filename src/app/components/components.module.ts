import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

//imports de Componentes personalizados
import { FabLoginComponent } from './fab-login/fab-login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';







@NgModule({
  declarations: [FabLoginComponent, RegistroComponent, LoginComponent, PerfilComponent
    ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule, 
  
  ], exports: [
    FabLoginComponent,
    RegistroComponent,
    LoginComponent,
    PerfilComponent
    
    
  ]

})
export class ComponentsModule { }
