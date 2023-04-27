import { Component, Input } from '@angular/core';

import { Article } from 'src/app/interfaces/news';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent {

  /**
   * Variable tipo Articulo para la carga de Articulos. Publica
   */
  public article: Article[] = [];

  /**
   * Recibe los articulos
   */
  @Input() articles: Article[] = [];

  /**
   * Constructor de Clase. Este Componente solo se encarga de cargar el Componente Artículo, para adaptarlo según dispositivo.
   */
  constructor() { }

}
