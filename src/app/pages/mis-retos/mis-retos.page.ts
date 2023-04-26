import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Reto, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MenuService } from '../../services/menu.service';
import { RetoService } from '../../services/reto.service';
import { AvisosService } from '../../services/avisos.service';
import { NewRetoComponent } from 'src/app/components/new-reto/new-reto.component';
import { InfoRetoComponent } from 'src/app/components/info-reto/info-reto.component';


@Component({
  selector: 'app-mis-retos',
  templateUrl: './mis-retos.page.html',
  styleUrls: ['./mis-retos.page.scss'],
})
export class MisRetosPage implements OnInit {

  email: string;
  usuario: Usuario;
  retos: Reto[] = [];

  constructor(public menuSvc: MenuService,
    private retoSvc: RetoService,
    private authSvc: AuthService,
    private userSvc: UserService,
    private avisosSvc: AvisosService,
    private modalCtrl: ModalController) {
    this.menuSvc.setMenu();
  }

  ngOnInit() {
    this.authSvc.getUserEmail().then(email => {
      this.email = email;
      this.userSvc.getUserByEmail(email).subscribe(usuario => {
        this.usuario = usuario;
      });
      this.retoSvc.getRetosByUser(email).subscribe(retos => {
        this.retos = retos;
      });
    });


  }

  async newReto(id: string) {
    const modal = await this.modalCtrl.create({
      component: NewRetoComponent,
      componentProps: {
        id
      },
      cssClass: 'modalInfo'
    });

    modal.present();
  }

  cambiarEstado(id: string) {
    console.log('cambio Estado', id);
    try {
     this.retoSvc.updateEstadoReto(id);
     
      this.avisosSvc.presentToast('Cambio de Estado Correcto', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error en el cambio de Estado', 'danger');
    }
  }

  deleteReto(id: string) {
    try {
         this.retoSvc.deleteReto(id);
      this.avisosSvc.presentToast('Usuario eliminado correctamente', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error al eliminar el usuario', 'danger');
    }

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

}
