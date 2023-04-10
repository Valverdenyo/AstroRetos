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
  usuario: Usuario;
  favoritos: Favorito[] = [];
  retos: Reto[] = [];
  favorito: string;

  constructor(public menuSvc: MenuService,
    private retoSvc: RetoService,
    private authSvc: AuthService,
    private userSvc: UserService,
    private avisosSvc: AvisosService) {

    this.menuSvc.setMenu();

    this.favoritos = [];
    this.retos = [];

  }

  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.email = email;
      this.userSvc.getUserByEmail(email).subscribe(usuario => {
        this.usuario = usuario;        
        this.retoSvc.getFavoritosByUser(this.usuario.ID).subscribe(favoritos => {
          this.favoritos = favoritos;
          for (let i = 0; i < favoritos.length; i++) {
            this.retoSvc.getRetosById(favoritos[i].ID_RETO).subscribe(retos => {
              this.retos.push(...retos);

            });
          }
        });
      });
    });

  }

  quitarFavorito(idFavorito: string) {

    /*     const favoritoIdObservable = this.retoSvc.getFavoritoID(idFavorito, this.usuario.ID);
        favoritoIdObservable.subscribe(favorito => {
          this.favorito = favorito
          console.log('id favorito', favorito);
        });
        console.log('vamos a eliminar el favorito ', this.favorito, 'del usuario', this.usuario.EMAIL)
    
        try {
          this.retoSvc.removeFavorito(this.favorito, this.usuario.ID);
    
    
          this.avisosSvc.presentToast('Usuario eliminado correctamente', 'success');
        } catch (error) {
          this.avisosSvc.presentToast('Error al eliminar el usuario', 'danger');
        } */

  }

}
