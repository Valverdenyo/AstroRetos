import { Component, OnInit } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Reto } from 'src/app/interfaces/interfaces';
import { RetoService } from 'src/app/services/reto.service';
import { InfoRetoComponent } from '../info-reto/info-reto.component';


@Component({
  selector: 'app-reto',
  templateUrl: './reto.component.html',
  styleUrls: ['./reto.component.scss'],
})
export class RetoComponent implements OnInit {

  /**
   * Comprueba si el usuario está logado o no para habilitar el icono de favoritos y de Realizado.
   */
  usuarioLogado = false;
  /**
   * Declaramos Array de Retos para guardar la info para mostrar.
   */
  retos: Reto[] = [];
  /**
   * Declara el tipo de icono para cambiarlo segiún el tipo de reto.
   */
  iconTipo: string;
  /**
   * Mensaje para compartir por RRSS.
   */
  mensaje: string = 'Te reto!';

  /**
   * 
   * @param retoSvc Servicio de manejo de Los Retos
   * @param modalCtrl Controlador de Modar para mostrar la info detallada como modal
   * @param socialSharing PlugIn para compartir por RRSS
   * @param platform Controla la plataforma dónde se usa la app, movil o web
   * @param auth Servicio de Firebase Auth
   */
  constructor(private retoSvc: RetoService,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private platform: Platform,
    private auth: AngularFireAuth) {

  }

  /**
   * Carga al inicio solo los retos marcados como Activos
   * Tambien revisa si el usuario está logado y busca si el reto ya lo tiene en Favoritos (NO IMPLEMENTADO) o no.
   */
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

  /**
   * Carga un modal para mostar la info detallada de un reto
   * @param id Id del Reto a mostrar
   */
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

  /**
   * CAmbia el Icono del reto según el tipo (ocular, telescopio, prismaticos)
   * @param tipo Tipo de Reto
   * @returns el nombre del icono de ionicons.io
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
   * Cambia el color del icono segun el nivel de dificultad del Reto
   * @param nivel Nivel del Reto
   * @returns El color del icono (verde, amarillo, rojo)
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

  /**
   * Gestiona si el reto esta en Favorito o no para mostrar el icono correspondiente (NO IMPLEMENTADO)
   */
  gestionFavorito() {

  }

}
