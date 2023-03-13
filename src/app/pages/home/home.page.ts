import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

/**
 * Componente Home. Indica la plantilla HTML que usa y su CSS.
 * Página de inicio que muestra los retos activos.
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  /**
   * Booleano para mostrar u ocultar el fab de Login
   */

  ionFabVisible = true;

  /**
   * Constructor del componente.
   */
  constructor(private authSvc: AuthService) { }

  /**
   * Método de inicio.
   * Comprobamos si estamos logados. Si lo estamos, no mostramos el fab de login.
   * Si no estamos logados lo muestra para poder iniciar sesión. 
   * 
   */
  ngOnInit() {
 
    this.authSvc.checkLogin();
   
    if (this.authSvc.checkLogin()) {
      console.log("SI logado");
      this.ionFabVisible = false;
    } else {
      console.log("NO logado");
      this.ionFabVisible = true;
    }

  }

}
