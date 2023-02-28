import { Component, OnInit, Output } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';




@Component({
  selector: 'app-fab-login',
  templateUrl: './fab-login.component.html',
  styleUrls: ['./fab-login.component.scss'],
})
export class FabLoginComponent implements OnInit {

 

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {

   
  }

  async loginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      cssClass: 'loginRegisterModal'
    });
    return await modal.present();
  }



}
