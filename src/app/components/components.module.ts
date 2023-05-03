import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//imports de Componentes personalizados
import { FabLoginComponent } from './fab-login/fab-login.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { RetoComponent } from './reto/reto.component';
import { InfoRetoComponent } from './info-reto/info-reto.component';
import { NewRetoComponent } from './new-reto/new-reto.component';
import { RetosComponent } from './retos/retos.component';





@NgModule({
  declarations: [FabLoginComponent,
    RegistroComponent,
    LoginComponent,
    NoticiaComponent,
    NoticiasComponent,
    MenuComponent,
    HeaderComponent,
    RetoComponent,
    RetosComponent,
    InfoRetoComponent,
    NewRetoComponent
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
    NoticiasComponent,
    MenuComponent,
    HeaderComponent,
    RetoComponent,
    RetosComponent,
    InfoRetoComponent,
    NewRetoComponent

  ]

})
export class ComponentsModule { }
