import { Component, Input, OnInit } from '@angular/core';

/**
 * Componente que standariza las cabeceras de todas las páginas del proyecto
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  /**
   * Recibe el título como parámetro para personalizar el título.
   */
  @Input() titulo: string = '';

  /**
   * Constructor de la clase
   */
  constructor() { }

  /**
   * Método de inicio
   */
  ngOnInit() { }

}
