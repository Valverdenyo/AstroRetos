import { Component, OnInit } from '@angular/core';
import { Reto, Usuario } from 'src/app/interfaces/interfaces';
import { RetoService } from 'src/app/services/reto.service';
import { InfoRetoComponent } from '../info-reto/info-reto.component';
import { ModalController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-reto',
  templateUrl: './reto.component.html',
  styleUrls: ['./reto.component.scss'],
})
export class RetoComponent implements OnInit {

  usuarioLogado= false;
  retos: Reto[] = [];
  iconTipo: string;
  mensaje: string = 'Te reto!';

  constructor(private retoSvc: RetoService,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private platform: Platform,
    private auth: AngularFireAuth) {

  }

  ngOnInit() {
    this.retoSvc.getRetosActivos().subscribe(retos => {
      this.retos = retos;
    });

    this.auth.user.subscribe(user => {
      this.usuarioLogado = !!user;
      if (this.usuarioLogado) {
        // Llamar al método para comprobar si el reto está en favoritos
      }
    });
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: InfoRetoComponent,
      componentProps: {
        id
      },
      cssClass: 'modalInfo'
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

  /**
   * Método para compartir el reto en las aplicaciones disponibles en el terminal (Mail o RRSS)
   */
  compartirReto() {

    if (this.platform.is('cordova')) {
      this.socialSharing.share(this.mensaje);
    } else {
      if (navigator.share) {
        navigator.share({
          text: this.mensaje,
          url: ''
        })
          .then(() => console.log('Compartido!'))
          .catch((error) => console.log('Error compartiendo', error));
      }
    }
  }

  gestionFavorito() {

  }


}
