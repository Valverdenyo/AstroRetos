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

  /**
   * Recibe el objeto reto a cargar
   */
  @Input() reto!: Reto;

  /**
   *recibe un numero de indice para la carga 
   */
  @Input() index!: number;

  /**
   * Comprueba si el usuario está logado o no para habilitar el icono de favoritos y de Realizado.
   */
  usuarioLogado = false;
  /**
   * Variable para guardar el email del usuario logado y así personalizar los iconos del reto
   */
  public userEmail: string;
  /**
   * Declaramos Array de Retos para guardar la info para mostrar.
   */
  retos: Reto[] = [];
  /**
    * Declaramos Array de Favoritos para guardar la info para mostrar.
    */
  favoritos: Favorito[] = [];

  /**
   * Objeto de tipo Favorito para almacenar la informacion
   */
  favorito: Favorito;

  /**
   * Para comprobar si el reto esta en favoritos del usuario
   */
  esFavorito: boolean;

  /**
   * Para comprobar si el resto está conseguido por el usuario
   */
  esRetoConseguido: boolean;
  /**
   * Declara el tipo de icono para cambiarlo según el tipo de reto.
   */
  iconTipo: string;
  /**
   * Mensaje para compartir por RRSS.
   */
  mensaje: string = 'Te reto!';

  /**
   * Numero de puntos obtenidos al conseguir el reto
   */
  puntos: number;

  /**
   * constructor de clase
   * @param retoSvc Servicio para el manejo de los retos
   * @param modalCtrl Controlador de uso de modales
   * @param socialSharing Componente usado para compartir retos en aplicaciones
   * @param platform Componente para comprobar la plataforma de ejecucion
   * @param userSvc Servicio de manejo del usuario
   * @param authSvc Servicio para controlar la autenticacion
   * @param avisosSvc Servicio de avisos a traves dded toast
   */
  constructor(private retoSvc: RetoService,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private platform: Platform,
    private userSvc: UserService,
    private authSvc: AuthService,
    private avisosSvc: AvisosService) {

    /*  this.userSvc.getUserEmail().subscribe(email => {
       this.userEmail = email;
       console.log('email', this.userEmail);
     }); */

    this.authSvc.initAuthStateListener();
    this.userEmail = this.authSvc.userEmail;

  }

  /**
   * Método de inicio
   * Checkeamos si el usuario logado tiene el reto en favorito o conseguido para mostrar los iconos correspondientes
   */
  ngOnInit() {

    console.log(this.reto.ID, this.userEmail);
    this.checkRetoFavorito(this.reto.ID, this.userEmail);
    this.checkRetoConseguido(this.reto.ID, this.userEmail);

  }

  /**
   * Carga un modal para mostar la info detallada de un reto
   * @param retoId Id del Reto a mostrar
   */
  async verDetalle(retoId: string) {
    const modal = await this.modalCtrl.create({
      component: InfoRetoComponent,
      componentProps: {
        retoId
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
   * Gestiona si el reto esta en Favorito o no para mostrar el icono correspondiente
   */
  checkRetoFavorito(retoId: string, user: string) {

    this.retoSvc.checkFavorito(retoId, user).subscribe(existe => {
      this.esFavorito = existe;
      console.log(this.esFavorito);
    });

  }

  /**
   * Metodo para marcar un reto como favorito
   * @param retoId Id del reto a marcar
   * @param user Email del usuario logado
   */
  setFavorito(retoId: string, user: string) {

    try {

      if (user) {
        this.retoSvc.addFavorito(retoId, user);
        this.avisosSvc.presentToast('Favorito añadido', 'success');

      } else {
        this.avisosSvc.presentToast('Debes estar logado para hacer esto', 'warning');
      }


    } catch (error) {
      this.avisosSvc.presentToast('Error al añadir Favorito', 'danger');
    }

  }

  /**
 * Metodo para desmarcar un reto como favorito
 * @param retoId Id del reto a marcar
 * @param user Email del usuario logado
 */
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

  /**
   * Gestiona si el reto esta esta conseguido por el usuario o no para mostrar el icono correspondiente
   */
  checkRetoConseguido(retoId: string, user: string) {

    this.retoSvc.checkRetoConseguido(retoId, user).subscribe(existe => {
      this.esRetoConseguido = existe;
      console.log(this.esRetoConseguido);
    });

  }

  /**
 * Metodo para marcar un reto como conseguido
 * @param retoId Id del reto a marcar
 * @param user Email del usuario logado
 */
  async setRetoConseguido(retoId: string, user: string) {

    try {

      if (user) {
        await this.retoSvc.addRetoConseguido(retoId, user);
        this.avisosSvc.presentToast('Reto conseguido', 'success');
       /*  this.userSvc.getTotalPuntosByUser(this.userEmail).subscribe(totalPuntos => {

         this.userSvc.updateUserPuntos(this.userEmail, totalPuntos);
        }); */
      } else {
        this.avisosSvc.presentToast('Debes estar logado para hacer esto', 'warning');
      }



    } catch (error) {
      this.avisosSvc.presentToast('Error al conseguir Reto', 'danger');
    }

  }

  /**
 * Metodo para desmarcar el reto conseguido
 * @param retoId Id del reto a marcar
 * @param user Email del usuario logado
 */
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
