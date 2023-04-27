import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  email: string;
  usuario: Usuario;
  usuarios: Usuario[] = [];

  constructor(private userSvc: UserService,
    public menuSvc: MenuService,
    private authSvc: AuthService) {

    this.menuSvc.setMenu();

  }

  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.email = email;
      this.userSvc.getUserByEmail(email).subscribe(usuario => {
        this.usuario = usuario;
      });

    });

    this.userSvc.getUsuariosPorPuntos().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

  }

}
