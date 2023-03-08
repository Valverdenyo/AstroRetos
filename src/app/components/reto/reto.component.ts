import { Component, OnInit } from '@angular/core';
import { Reto } from 'src/app/interfaces/interfaces';
import { RetoService } from 'src/app/services/reto.service';
import { InfoRetoComponent } from '../info-reto/info-reto.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-reto',
  templateUrl: './reto.component.html',
  styleUrls: ['./reto.component.scss'],
})
export class RetoComponent implements OnInit {

  retos: Reto[] = [];
   iconTipo: string;

  constructor(private retoSvc: RetoService, 
    private modalCtrl: ModalController) {
     
     }

  ngOnInit() {
    this.retoSvc.getRetosActivos().subscribe(retos => {
      this.retos = retos;
    });
  }

  async verDetalle( id: string ) {
    const modal= await this.modalCtrl.create({
      component: InfoRetoComponent,
      componentProps: {
        id
      },
    });

    modal.present();
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
