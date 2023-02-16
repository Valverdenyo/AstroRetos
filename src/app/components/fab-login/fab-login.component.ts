import { Component, OnInit } from '@angular/core';

//import del Modal de Login
import { ModalController } from '@ionic/angular';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

@Component({
  selector: 'app-fab-login',
  templateUrl: './fab-login.component.html',
  styleUrls: ['./fab-login.component.scss'],
})
export class FabLoginComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
   
  }

  async openModalLogin() {
    const modal = await this.modalCtrl.create({
      component: ModalLoginComponent,
      componentProps: {
        
      }
    });
  
    return await modal.present();
  }

}
