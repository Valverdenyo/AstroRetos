import { Component, Input, OnInit } from '@angular/core';
import { Reto } from 'src/app/interfaces/interfaces';
import { RetoService } from 'src/app/services/reto.service';
import { RetoComponent } from '../reto/reto.component';

@Component({
  selector: 'app-info-reto',
  templateUrl: './info-reto.component.html',
  styleUrls: ['./info-reto.component.scss'],
})
export class InfoRetoComponent implements OnInit {

  @Input() id: string;
  reto: Reto;
  oculto = 150;
  iconTipo: string;

  constructor(private retoSvc: RetoService,
    private retoComponent: RetoComponent) { }

  ngOnInit() {
   
      this.retoSvc.getRetosActivos().subscribe(retos => {
        this.reto = retos[0];
      });
    
  }

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
