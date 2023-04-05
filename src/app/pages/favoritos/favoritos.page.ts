import { Component, OnInit } from '@angular/core';

import { Usuario, Reto, Favorito } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(public menuSvc: MenuService,
    private retoSvc: RetoService,
    private authSvc: AuthService,
    private userSvc: UserService) {

    this.menuSvc.setMenu();

  }

  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.email = email;
      this.userSvc.getUserByEmail(email).subscribe(usuario => {
        this.usuario = usuario;
        console.log(this.usuario.ID);
        this.retoSvc.getFavoritosByUser(this.usuario.ID).subscribe(favoritos => {
          this.favoritos = favoritos;
          for (let index = 0; index < favoritos.length; index++) {
            this.retoSvc.getRetosById(favoritos[index].ID_RETO).subscribe(reto => {
              this.retos[0] = reto[0];
            });
          }
        });
      });
    });

  }

}
