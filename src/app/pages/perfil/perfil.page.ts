import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

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
