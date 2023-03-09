import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';



/**
 * Componente tipo Fab.
 * Se encarga de dar acceso al formulario de Login.
 * Solo se muestra en las páginas de acceso anónimo y cuando no se estgá logado.
 */
@Component({
  selector: 'app-fab-login',
  templateUrl: './fab-login.component.html',
  styleUrls: ['./fab-login.component.scss'],
})
export class FabLoginComponent implements OnInit {

  /**
   * Constructor de la clase
   * @param modalCtrl 
   * Controlador de Modal de Ionic
   */
  constructor(private modalCtrl: ModalController) { }


  /**
   * Método de inicio
   */
  ngOnInit() {


  }
  /**
   * Abre la ventana de Login como un Modal
   * @returns 
   * 
   */
  async loginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      cssClass: 'loginRegisterModal'
    });
    return await modal.present();
  }

}
