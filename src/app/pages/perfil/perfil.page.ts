import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuarioLogado: Usuario;
  result: string;
  actionSheet: HTMLIonActionSheetElement;

  constructor(private authSrv: AuthService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private userSvc: UserService,
    private router: Router,
    private navCtrl: NavController
  ) {

  }

  ionViewWillEnter() {
    localStorage.get('email').then((token) => {
      if (!token) {
        // Si el usuario no está logado, navega a la página de inicio de sesión
        this.navCtrl.navigateRoot('/home');
      } else {
        
      }
    });
  }

  ngOnInit() {

    this.usuarioLogado = this.authSrv.usuarioLogado;

    console.log(this.usuarioLogado);

  }
  
  passChange() {

  }

  logOut() {
    this.authSrv.signOut();
    this.modalCtrl.dismiss();

  }


  async avatarActionSheet() {
    this.actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'multimedia-class',
      buttons: [
        {
          icon: 'camera-outline',
          handler: () => {
            console.log('Button 1 clicked');
          }
        },
        {
          icon: 'image-outline',
          handler: () => {
            console.log('Button 2 clicked');
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ],
      // Template personalizado para mostrar los botones a la izquierda y derecha
      // Los botones se ajustarán a los lados opuestos de la hoja de acción
      // utilizando la clase CSS "ion-action-sheet-buttons-start" e "ion-action-sheet-buttons-end"
      // y se alinearán al centro de la hoja de acción utilizando la clase CSS "ion-justify-content-center"
      backdropDismiss: true,
      animated: true,
      keyboardClose: true,
      mode: 'ios',
     
      translucent: true,
      id: 'my-action-sheet'
    });

    await this.actionSheet.present();
  }

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
            this.userSvc.deleteUser(this.usuarioLogado.ID);
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });

    await alert.present();
  }
}
