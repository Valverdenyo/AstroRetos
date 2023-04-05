import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reto } from 'src/app/interfaces/interfaces';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MultimediaService } from '../../services/multimedia.service';
import { RetoService } from '../../services/reto.service';

@Component({
  selector: 'app-new-reto',
  templateUrl: './new-reto.component.html',
  styleUrls: ['./new-reto.component.scss'],
})
export class NewRetoComponent implements OnInit {
  /**
   * Creamos un nuevo FormGroup para crear los Retos
   */
  newRetoForm: FormGroup;
  /**
   * Objeto donde se guardará la información del Reto
   */
  reto: Reto;
  /**
   * Variable que almacena la imagen cogida de la Galeria
   */
  image: SafeResourceUrl;
  /**
   * Imagen saneada preparada para subir a Firestorage
   */
  imagenSaneada: any;
  /**
   * Para almacenar el email del usuario logado
   */
  userEmail: string;

  /**
   * 
   * @param modalCtrl Controlador del Modal
   * @param fBuilder Constructor del Formulario
   * @param authSvc Servicio para gestionar los inicios de sesión y su estado
   * @param sanitizer Saneador para la imagen, prepara una URL segura
   * @param multimediaSvc Servicio de subida de imagen a Firestorage
   * @param retoSvc Servicio de manejo de Retos
   * @param alertCtrl Controlador de Alertas
   */
  constructor(private modalCtrl: ModalController,
    private fBuilder: FormBuilder,
    private authSvc: AuthService,
    private sanitizer: DomSanitizer,
    private multimediaSvc: MultimediaService,
    private retoSvc: RetoService,
    private alertCtrl: AlertController) { }

    /**
     * En el inicio cargamos el usuario logado.
     * Tambien construimos el formulario con sus validadores
     */
  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.userEmail = email;
    });

    this.newRetoForm = this.fBuilder.group({
      TITULO: new FormControl('', Validators.compose([
        Validators.required
      ])),
      DESCRIPCION: new FormControl('', Validators.compose([
        Validators.required
      ])),
      TIPO: new FormControl('', Validators.compose([
        Validators.required
      ])),
      NIVEL: new FormControl('', Validators.compose([
        Validators.required
      ])),
      ACTIVO: new FormControl(true, Validators.compose([
        Validators.required
      ])),
    });
  }

/**
 * Metodo que selecciona una imagen de la galeria y la sanea para luego subirla a Firestorage a través del Servicio
 */
  async selectImage() {

    const foto = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
    //Hay que sanearla
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(foto && (foto.dataUrl));
    let blob = await fetch(foto.dataUrl).then(r => r.blob());
    this.imagenSaneada = blob;
    console.log('tenemos imagen', blob);

  }

  /**
   * Metodo que recoge los valores del formulario, los asigna al objeto Reto y lo crea en Firestore a través del Servicio de Retos
   * @param value Valores recogidos por el Formulario
   */
  async crearReto(value: any) {

    console.log('vamos a crear el reto');

    try {

      const res = await this.multimediaSvc.subirImagen(this.imagenSaneada, 'retos', this.userEmail);

      this.reto = value;
      this.reto.DESTACADO = true;
      this.reto.RETADOR = this.userEmail;
      this.reto.IMAGEN = res;

      console.log('Arriba el reto con', this.reto.TITULO, this.reto.DESCRIPCION);

      this.retoSvc.addReto(this.reto);


    } catch (error) {
      console.log('Error creando el Reto:', error);
    }

  }

/**
 * Alerta para pedir confirmación
 */
  async presentAlert() {

    console.log(this.newRetoForm.value)

  }

  /**
   * Cerramos el modal
   */
  closeModal() {
    this.modalCtrl.dismiss();
  }



}
