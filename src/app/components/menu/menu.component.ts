import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuOpts } from '../../interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  /**
   * Recibe como parametro de entrada los elementos de menú disponibles según el rol del usuario
   */
  @Input()  menuOpts: MenuOpts[];

  constructor(private router: Router) { }

  /**
   * Método de inicio. No hace nada en la carga
   */
  ngOnInit() {

  }

/**
 * Navega a la página solicitada
 * @param url a la que va navegar
 */
  navigateToPage(url: string) {
    this.router.navigate([url]);
  }

}
