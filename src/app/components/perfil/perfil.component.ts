import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

import { Usuario } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  @Input() email: string;
  usuario: Usuario;

  

  constructor(private authSrv: AuthService,
              private modalCtrl: ModalController,
              private userSvc: UserService
              ) { 
                  
               
              }

  ngOnInit() {

  
       // Como ejemplo, mostrar el título de la tarea en consola
       
     
   
  

          
      /*   this.usuario.NOMBRE = this.usuarios.data.NOMBRE;
        this.usuario.AVATAR = this.usuarios.data.AVATAR; */
     
      
  

  }

  passChange() {

  }

  logOut() {
    this.authSrv.signOut();
    this.modalCtrl.dismiss();

  }

}

