import { Component, Input } from '@angular/core';

import { Reto } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-retos',
  templateUrl: './retos.component.html',
  styleUrls: ['./retos.component.scss'],
})
export class RetosComponent {

  /**
   * Array de Retos
   */
  public reto: Reto[] = [];

  /**
   * Recie retos como parámetro
   */
  @Input() retos: Reto[] = []

  /**
   * Constructor de clase
   */
  constructor() { }

}
