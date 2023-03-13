import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { AvisosService } from 'src/app/services/avisos.service';
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

  constructor(private authSvc: AuthService,
    
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private userSvc: UserService,
    private router: Router,
    private navCtrl: NavController,
    private avisosSvc: AvisosService

  ) {
    
    this.userSvc.getUserByEmail(this.result).subscribe(usuario => {
      this.usuarioLogado = usuario;
    });
  }

  ngOnInit() {



  }

  logOut() {
    this.authSvc.signOut();
    this.navCtrl.navigateRoot('/home');

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
            //   this.selectImage()
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


}
