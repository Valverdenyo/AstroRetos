import { Component, Input, OnInit } from '@angular/core';
import { Reto } from 'src/app/interfaces/interfaces';
import { RetoService } from 'src/app/services/reto.service';
import { RetoComponent } from '../reto/reto.component';


/**
 * Componente que muestra un ion-card con toda las actividades que sae pueden realizar con cada uno.
 */
@Component({
  selector: 'app-info-reto',
  templateUrl: './info-reto.component.html',
  styleUrls: ['./info-reto.component.scss'],
})
export class InfoRetoComponent implements OnInit {

  /**
   * 
   */
  @Input() id: string;
  reto: Reto;
  oculto = 150;
  iconTipo: string;

  /**
   * 
   * @param retoSvc Servicio que maneja la colección 'retos' en Firestore
   * @param retoComponent Carga del Componente Reto
   */
  constructor(private retoSvc: RetoService,
    private retoComponent: RetoComponent) { }

  /**
   * Método de inicio.
   * Carga los retos activos a través del Servicio.
   */
  ngOnInit() {

    this.retoSvc.getRetosActivos().subscribe(retos => {
      this.reto = retos[0];
    });

  }

  /**
   * Método que asigna un icono dependiendo del tipo de reto pasado por parámetro
   * @param tipo 
   * @returns 
   * Retorna el nombre del incono de ionicons.io
   */
  getIconTipo(tipo: string): string {
    switch (tipo) {
      case 'telescopio':
        return 'telescope-outline';
      case 'prismaticos':
        return 'recording-outline';
      case 'ocular':
        return 'eye-outline';
      default:
        return 'help';
    }
  }

  /**
   * Método que asigna un color al icono dependiendo del nivel de dificultad del reto 
   * @param nivel 
   * @returns 
   * Retorna el color a poner en el icono
   */
  getColorNivel(nivel: string): string {
    switch (nivel) {
      case 'facil':
        return 'success';
      case 'intermedio':
        return 'warning';
      case 'dificil':
        return 'danger';
      default:
        return 'help';
    }
  }

}
