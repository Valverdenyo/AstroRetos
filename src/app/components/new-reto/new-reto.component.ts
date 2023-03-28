import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reto } from 'src/app/interfaces/interfaces';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MultimediaService } from '../../services/multimedia.service';
import { RetoService } from '../../services/reto.service';

@Component({
  selector: 'app-new-reto',
  templateUrl: './new-reto.component.html',
  styleUrls: ['./new-reto.component.scss'],
})
export class NewRetoComponent implements OnInit {

  newRetoForm: FormGroup;
  reto: Reto;
  image: any;
  imagenSaneada: any;
  userEmail: string;

  constructor(private modalCtrl: ModalController,
    private fBuilder: FormBuilder,
    private authSvc: AuthService,
    private sanitizer: DomSanitizer,
    private multimediaSvc: MultimediaService,
    private retoSvc: RetoService) { }

  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.userEmail = email;
    });

    this.newRetoForm = this.fBuilder.group({
      titulo: new FormControl('', Validators.compose([
        Validators.required
      ])),
      descripcion: new FormControl('', Validators.compose([
        Validators.required
      ])),
      tipo: new FormControl('', Validators.compose([
        Validators.required
      ])),
      nivel: new FormControl('', Validators.compose([
        Validators.required
      ])),
      activo: new FormControl(true, Validators.compose([
        Validators.required
      ])),
    });
  }

  async selectImage() {

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

    console.log('tenemos imagen', blob);

  }

  async crearReto(value: any){

    console.log('vamos a crear el reto');

    try {

      const res = await this.multimediaSvc.subirImagen(this.imagenSaneada, 'retos', this.userEmail);

      this.reto = value;
      this.reto.DESTACADO = true;
      this.reto.RETADOR = this.userEmail;
      this.reto.IMAGEN = res;

      console.log('Arriba el reto con', this.reto.TITULO, this.reto.DESCRIPCION);

      this.retoSvc.setReto(this.reto);
      

    } catch (error) {
      console.log('Error creando el Reto:', error);
    }

  }

  async setImage(){
   
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
