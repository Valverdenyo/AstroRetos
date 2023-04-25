import { Component, OnInit } from '@angular/core';

import { Usuario, Reto, Favorito } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { AvisosService } from 'src/app/services/avisos.service';

import { MenuService } from 'src/app/services/menu.service';
import { RetoService } from 'src/app/services/reto.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  email: string;
  idUser: string;
  idFavorito: string;
  usuario: Usuario;
  favoritos: Favorito[] = [];
  
  retos: Reto[] = [];
  

  constructor(public menuSvc: MenuService,
    private retoSvc: RetoService,
    private authSvc: AuthService,
    private userSvc: UserService,
    private avisosSvc: AvisosService) {

    this.menuSvc.setMenu();  
  }

  ngOnInit() {

    this.favoritos = [];

    this.authSvc.getUserEmail().then(email => {
      this.email = email;
      this.userSvc.getUserByEmail(email).subscribe(usuario => {
        this.usuario = usuario;
        this.idUser = this.usuario.ID;
        console.log(this.usuario.NOMBRE);
              
      });

      this.retoSvc.getFavoritosByUser(this.email).subscribe(favoritos => {
        this.favoritos = favoritos;

         for (let index = 0; index < this.favoritos.length; index++) {
          this.retoSvc.getRetosById(this.favoritos[index].ID_RETO).subscribe(reto => {
            this.retos = [...this.retos, ...reto];
            console.log('reto', index, this.retos[index], this.favoritos[index]);
          });          
        } 
        
    
      });
    });
  
  } 
  
  quitarFavorito(id: string) {
    try {
      this.retoSvc.deleteFavorito(id);
      console.log('eliminando reto', this.idFavorito, id);
   this.avisosSvc.presentToast('Favorito eliminado correctamente', 'success');
 } catch (error) {
   this.avisosSvc.presentToast('Error al eliminar el Favorito', 'danger');
 }
  }

}
