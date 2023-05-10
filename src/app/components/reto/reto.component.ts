import { Component, Input, OnInit } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { Favorito, Reto } from 'src/app/interfaces/interfaces';
import { RetoService } from 'src/app/services/reto.service';
import { InfoRetoComponent } from '../info-reto/info-reto.component';
import { AuthService } from 'src/app/services/auth.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AvisosService } from 'src/app/services/avisos.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-reto',
  templateUrl: './reto.component.html',
  styleUrls: ['./reto.component.scss'],
})
export class RetoComponent implements OnInit {

  @Input() reto!: Reto;

  @Input() index!: number;

  /**
   * Comprueba si el usuario está logado o no para habilitar el icono de favoritos y de Realizado.
   */
  usuarioLogado = false;
  /**
   * Variable para guardar el email del usuario logado y así personalizar los iconos del reto
   */
  email: string;
  /**
   * Declaramos Array de Retos para guardar la info para mostrar.
   */
  retos: Reto[] = [];
  /**
    * Declaramos Array de Favoritos para guardar la info para mostrar.
    */
  favoritos: Favorito[] = [];

  favorito: Favorito;

  esFavorito: boolean;

  esRetoConseguido: boolean;
  /**
   * Declara el tipo de icono para cambiarlo según el tipo de reto.
   */
  iconTipo: string;
  /**
   * Mensaje para compartir por RRSS.
   */
  mensaje: string = 'Te reto!';

  puntos: number;

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
    private userSvc: UserService,
    private avisosSvc: AvisosService) {

    this.userSvc.getUserEmail().subscribe(email => {
      this.email = email;
      console.log('email', this.email);
    });

  }

  ngOnInit() {


    console.log(this.reto.ID, this.email);
    this.checkRetoFavorito(this.reto.ID, this.email);
    this.checkRetoConseguido(this.reto.ID, this.email);

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
  checkRetoFavorito(retoId: string, user: string) {

    this.retoSvc.checkFavorito(retoId, user).subscribe(existe => {
      this.esFavorito = existe;
      console.log(this.esFavorito);
    });
  }


  setFavorito(retoId: string, user: string) {
    try {

      if (user !== '') {
        this.retoSvc.addFavorito(retoId, user);
        this.avisosSvc.presentToast('Favorito añadido', 'success');

      } else {
        this.avisosSvc.presentToast('Debes estar logado para hacer esto', 'warning');
      }


    } catch (error) {
      this.avisosSvc.presentToast('Error al añadir Favorito', 'danger');
    }
  }

  quitarFavorito(retoId: string, email: string) {
    try {

      this.retoSvc.getFavorito(retoId, email).subscribe(fav => {

        this.retoSvc.deleteFavorito(fav[0].ID_FAV);
      })


      this.avisosSvc.presentToast('Favorito eliminado correctamente', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error al eliminar el Favorito', 'danger');
    }
  }

  checkRetoConseguido(retoId: string, user: string) {

    this.retoSvc.checkRetoConseguido(retoId, user).subscribe(existe => {
      this.esRetoConseguido = existe;
      console.log(this.esRetoConseguido);
    });
  }

  setRetoConseguido(retoId: string, user: string) {
    try {
      console.log('vamos a conseguir el reto');
      this.retoSvc.addRetoConseguido(retoId, user);
      this.avisosSvc.presentToast('Reto conseguido', 'success');
      this.userSvc.getTotalPuntosByUser(this.email).subscribe(totalPuntos => {
console.log('total de puntos', totalPuntos);
        this.userSvc.updateUserPuntos(this.email, totalPuntos);
      })

    } catch (error) {
      this.avisosSvc.presentToast('Error al conseguir Reto', 'danger');
    }
  }

  removeRetoConseguido(retoId: string, email: string) {
    try {

      this.retoSvc.getRetoConseguido(retoId, email).subscribe(retoConseguido => {

        this.retoSvc.deleteRetoConseguido(retoConseguido[0].ID_RETO_CONSEGUIDO);
        this.avisosSvc.presentToast('Reto Conseguido eliminado', 'success');
      });
    } catch (error) {
      this.avisosSvc.presentToast('Error al eliminar Reto', 'danger');
    }
  }



}
