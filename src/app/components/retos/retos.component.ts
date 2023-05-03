import { Component, Input } from '@angular/core';

import { Reto } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-retos',
  templateUrl: './retos.component.html',
  styleUrls: ['./retos.component.scss'],
})
export class RetosComponent {

  public reto: Reto[] = [];

  @Input() retos: Reto[] = []

  constructor() { }

 
}
