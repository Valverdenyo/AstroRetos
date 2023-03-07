import { Component, OnInit } from '@angular/core';


/**
 * Componente Home. Indica la plantilla HTML que usa y su CSS.
 */

declare var RSSParser;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ionFabVisible = true;
 
  /**
   * Constructor del componente.
   */
  constructor() { }

  ngOnInit() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado === 'true') {
   //   this.ionFabVisible = false;

    } else {
      this.ionFabVisible = true;
    }
  }

}
