import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { AvisosService } from 'src/app/services/avisos.service';
import { MultimediaService } from '../../services/multimedia.service';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  /**
   * Email del usuario logado
   */
  userEmail: string;

  /**
   * Objeto que guarda los datos del usuario logado
   */
  usuarioLogado: Usuario;

  /**
   * Variable donde se almacena la imagen obtenida de la camara o de la galeria
   */
  image: any;

  /**
   * Variable que almacena la imagen ya lista para ser subida de forma segura
   */
  imagenSaneada: any;

  /**
   * ActionSheet que se va a usar para mostrar la galeria o la camara
   */
  actionSheet: HTMLIonActionSheetElement;

  /**
   * Constructor de clase.
   * Revisa el estado de la sesión, recoge el mail y busca su perfil para cargar los datos.
   * @param authSvc Servicio de autenticación para el manejo del cambio de contraseña
   * @param actionSheetCtrl Controlador del ActionSheet que mostrará los accesos a la Camara o Galeria
   * @param alertCtrl Controlador de las Alertas
   * @param userSvc Servicio de manejo del Usuario
   * @param router Controlador de rutas de accceso
   * @param navCtrl Controlador para redirigir a determinadas rutas
   * @param avisosSvc Servicio de avisos a traves de Toast
   * @param multimediaSvc Servicio de manejo de las imagenes
   * @param angularFireAuth Servicio de Angular para el manejo del estado de la sesión
   * @param sanitizer Libreria que 'sanea' la imagen para hacer una subida segura a Firestorage
   */
  constructor(private authSvc: AuthService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private userSvc: UserService,
    private router: Router,
    private navCtrl: NavController,
    private avisosSvc: AvisosService,
    private multimediaSvc: MultimediaService,
    private angularFireAuth: AngularFireAuth,
    private sanitizer: DomSanitizer,


  ) {

    /*   this.angularFireAuth.onAuthStateChanged(user => {

      if (user) {
        // El usuario está logueado
        this.userSvc.getUserEmail().subscribe(email => {
          this.userEmail = email;
   

          this.userSvc.getUserByEmail(email).subscribe(usuario => {

            this.usuarioLogado = usuario;
          });

        });

      } else {
        // El usuario no está logueado
        console.log('no deberias estar aqui');

      }

    });        */

  }

  /**
   * Metodo de inicio
   */
  ngOnInit() {
    this.userSvc.getUserEmail().subscribe(email => {
      this.userEmail = email;
      console.log(this.userEmail);
      this.userSvc.getUserByEmail(email).subscribe(usuario => {

        this.usuarioLogado = usuario;
      });
    });
  
  }

  /**
   * Metodo para deslogarse. Llama al servicio de Autenticacion, desloga, y te envia al Home.
   */
  logOut() {

    this.authSvc.signOut();
    this.navCtrl.navigateRoot('/home');

  }

  /**
   * Método que muestra un ActionSheet con los iconos de Camara y Galeria para seleccionar la imagen del Avatar
   */
  async avatarActionSheet() {

    this.actionSheet = await this.actionSheetCtrl.create({

      cssClass: 'multimedia-class',
      buttons: [
        {
          icon: 'camera-outline',
          handler: () => {
            this.setAvatarCamara();
          }
        },
        {
          icon: 'image-outline',
          handler: () => {
            this.setAvatarGallery();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ],

      /** Template personalizado para mostrar los botones a la izquierda y derecha
       * Los botones se ajustarán a los lados opuestos de la hoja de acción
       * utilizando la clase CSS "ion-action-sheet-buttons-start" e "ion-action-sheet-buttons-end"
       * y se alinearán al centro de la hoja de acción utilizando la clase CSS "ion-justify-content-center"
       */
      backdropDismiss: true,
      animated: true,
      keyboardClose: true,
      mode: 'ios',

      translucent: true,
      id: 'my-action-sheet'

    });

    await this.actionSheet.present();

  }

  /**
   * Metodo que muestra una Alerta al eliminar el Usuario y si aceptamos, lo ELIMINA. NO IMPLEMENTADO
   * Al eliminarlo de devuelve al Home
   * @param documentId ID del usuario a eliminar (el mismo que ha iniciado sesión)
   */
  async alertDelete(documentId: string) {

    const alert = await this.alertCtrl.create({
      header: 'Eliminar usuario',
      message: '¿Estás seguro de que quieres eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Eliminar',
          handler: () => {
            //  this.userSvc.deleteUser(this.usuarioLogado.ID);
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Muestra una Alerta para cambiar la contraseña. Se especifica 2 veces la contraseña,
   * y si coinciden lanza el servicio de cambio de contraseña y te desloga para que entres
   * con la contraseña nueva
   */
  async alertPassChange() {
    const alert = await this.alertCtrl.create({
      header: 'Pon tu nueva contraseña',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            // Obtener los valores de los campos de texto
            const password1 = data.password1;
            const password2 = data.password2;
            console.log(password1, password2);

            // Comparar los valores de las contraseñas y mostrar un mensaje de error si no coinciden
            if (password1 != password2) {
              this.avisosSvc.presentToast('Las contraseñas no coinciden', 'danger');
            } else {
              // Las contraseñas coinciden, realizar la acción deseada
              this.authSvc.passChange(password1);
              this.logOut();

              this.avisosSvc.presentToast('Contraseña cambiada correctamente', 'success');

            }
          }
        }
      ],

      inputs: [

        {
          name: 'password1',
          type: 'password',
          placeholder: 'Pon tu nueva contraseña',
          attributes: {
            minlength: 6,
          },
        },
        {
          name: 'password2',
          type: 'password',
          placeholder: 'Repite la contraseña',
          attributes: {
            minlength: 6,
          },
        }
      ],
    });

    await alert.present();

  }

  /**
   * Metodo para aplicar un Avatar al Usuario desde la Galeria
   * Se selecciona la imagen de la galeria, la sanea para que sea segura y lanza el servicio de subida de la imagen
   * a Firestorage y posteriormente el servicio de actualizacion del usuario pasando el ID del usuario y la URL de acceso
   */
  async setAvatarGallery() {
    const foto = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
    //hay que sanearla
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(foto && (foto.dataUrl));
    let blob = await fetch(foto.dataUrl).then(r => r.blob());
    this.imagenSaneada = blob;

    const res = await this.multimediaSvc.subirImagen(this.imagenSaneada, 'avatar', this.usuarioLogado.EMAIL);
    console.log('ruta', res);
    console.log('id', this.usuarioLogado.ID);
    this.userSvc.updateUserAvatar(this.usuarioLogado.ID, res);
  }

  /**
  * Metodo para aplicar un Avatar al Usuario desde la Camara
  * Se selecciona la imagen de la galeria, la sanea para que sea segura y lanza el servicio de subida de la imagen
  * a Firestorage y posteriormente el servicio de actualizacion del usuario pasando el ID del usuario y la URL de acceso
  */
  async setAvatarCamara() {

    const foto = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    //hay que sanearla
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(foto && (foto.dataUrl));
    let blob = await fetch(foto.dataUrl).then(r => r.blob());
    this.imagenSaneada = blob;

    const res = await this.multimediaSvc.subirImagen(this.imagenSaneada, 'avatar', this.usuarioLogado.EMAIL);
    console.log('ruta', res);
    console.log('id', this.usuarioLogado.ID);
    this.userSvc.updateUserAvatar(this.usuarioLogado.ID, res);

  }

}
