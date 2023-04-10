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
  idFavorito: string;

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

  quitarFavorito(idReto: string, idUsuario: string) {

    this.retoSvc.getFavoritoByIdReto(idReto, idUsuario).subscribe(favorito => {
      this.idFavorito = favorito.ID_FAV;
      console.log('quitando favorito', this.idFavorito);
      this.retoSvc.removeFavorito(this.idFavorito, idUsuario);
    

    })


  }

}
