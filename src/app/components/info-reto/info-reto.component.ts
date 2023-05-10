
import { Component, Input, OnInit } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { Reto } from 'src/app/interfaces/interfaces';
import { RetoService } from 'src/app/services/reto.service';
import { AvisosService } from 'src/app/services/avisos.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
   * Recibe el id del Reto a través de un Input que se envia desde el Card  * 
   */
  @Input() id: string;
  /**
   * Declaramos un objeto Reto para guardar la información a mostrar.
   */
  reto: Reto;
  /**
   * Esta variable sirve para mostrar una descripcion corta de 150 caracteres, y luego la completa si le damos a Mostrar más
   */
  oculto = 150;
  /**
   * Mensaje standard para el botón de compartir en RRSS
   */
  mensaje: string = 'Te reto!';
  /** Variable string para almacenar el email del usuario logado
   * 
   */
  email: string;

  esFavorito: boolean;

  esRetoConseguido: boolean;

  /**
   *  
   * @param retoSvc Servicio que maneja la coleccion 'retos' de Firestore
   * @param modalCtrl Controla el modal
   * @param socialSharing Componente que comparte Retos por RRSS
   * @param avisosSvc Componente para mostrar avisos success/error
   * @param authSvc Componente para controlar el inicio de sesion
   * @param platform Controla si abrimos la app por Navegador Web o Movil para así usar correctamente el SocialSharing
   */
  constructor(private retoSvc: RetoService,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private avisosSvc: AvisosService,
    private authSvc: AuthService,
    private userSvc: UserService,
    private platform: Platform
  ) { }

  /**
   * Método de inicio.
   * Carga el reto con un Id pasado por parámetro a través del Input. 
   * Lo guarda en un array de retos, pero solo el de la posición 0.
   */
  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.email = email;

    });

    this.retoSvc.getRetosById(this.id).subscribe(retos => {
      this.reto = retos[0];
      this.checkRetoFavorito(this.reto.ID, this.email);
      this.checkRetoConseguido(this.reto.ID, this.email);
    });
    
  }

  /**
   * Método que asigna un icono dependiendo del tipo de reto pasado por parámetro
   * @param tipo Tipo de reto
   * @returns Retorna el nombre del incono de ionicons.io
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
   * @param nivel Nivel de dificultad del Reto
   * @returns Retorna el color a poner en el icono
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

  checkRetoFavorito(retoId: string, user: string) {

    this.retoSvc.checkFavorito(retoId, user).subscribe(existe => {
      this.esFavorito = existe;
      console.log(this.esFavorito);
    });
  }


  /**
   * Método para marcar como Favorito un Reto concreto al usuario logado
   * Al finalizar muestra el toast con el mensaje de success o error
   * @param retoId ID del reto a marcar como Favorito
   * @param user Usuario que marca el Favorito
   */
  setFavorito(retoId: string, user: string) {
    try {

      this.retoSvc.addFavorito(retoId, user);
      this.avisosSvc.presentToast('Favorito añadido', 'success');

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


  /**
   * Método que cierra el modal para volver al listado
   */
  cierreModal() {
    this.modalCtrl.dismiss();
  }
}
