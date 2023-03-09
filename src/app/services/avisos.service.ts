import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  constructor(private toastCtrl: ToastController) { }

  async presentToast(mensaje: string, estado: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      color: estado,
      duration: 3000,
     
    });

    await toast.present();
  
  }

}
