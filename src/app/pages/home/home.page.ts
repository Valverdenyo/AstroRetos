import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  /**
   * Método de inicio.
   * 
   *
   */
  ngOnInit() {

    /**
     * Constante que almacena si hemos iniciado sesión en la aplicación
     */
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    /**
     * Comprobamos si estamos logados. Si lo estamos, no mostramos el fab de login.
     * Si no estamos logados lo muestra para poder iniciar sesión. 
     */
    if (usuarioLogado === 'true') {
      this.ionFabVisible = false;

    } else {
      this.ionFabVisible = true;
    }
  }

}
