import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

//imports de Componentes personalizados
import { FabLoginComponent } from './fab-login/fab-login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';





@NgModule({
  declarations: [FabLoginComponent, 
    RegistroComponent, 
    LoginComponent, 
    NoticiaComponent, 
    NoticiasComponent, 
    MenuComponent, 
    HeaderComponent
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
    HeaderComponent
    
       
    
  ]

})
export class ComponentsModule { }
