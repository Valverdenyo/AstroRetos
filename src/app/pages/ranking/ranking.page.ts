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

  /**
   * Guarda el email del usuario logado
   */
  public userEmail: string;

  /**
   * Objeto de tipo usuario
   */
  usuario: Usuario;

  /**
   * Array de objetos de Usuario
   */
  usuarios: Usuario[] = [];

  /**
   * constructor de clase
   * @param userSvc Servicio personalizado para manejo de Usuarios
   * @param menuSvc Servicio para controlar el menu
   * @param authSvc Servicio para gestionar la Autenticación
   */
  constructor(private userSvc: UserService,
    public menuSvc: MenuService,
    private authSvc: AuthService) {

      //Cargamos opciones de Menu
    this.menuSvc.setMenu();

  }

  /**Metodos de carga al inicio
   * Comprobamos si está logado y guardamos la info del usuario logado
   * Carga los puntos de cada usuario
   */
  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.userEmail = email;
      this.userSvc.getUserByEmail(this.userEmail).subscribe(usuario => {
        this.usuario = usuario;
      });

    });

    this.userSvc.getUsuariosPorPuntos().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

  }

}
