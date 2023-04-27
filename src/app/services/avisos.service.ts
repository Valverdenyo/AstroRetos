import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  /**
   * Constructor de clase
   * @param toastCtrl controlador del componente Toast que muestra los avisos
   */
  constructor(private toastCtrl: ToastController) { }

  /**
   * Muestra el toast con el mensaje y color pasado por parámetro
   * @param mensaje String qcon el mensaje a mostrar
   * @param estado String con el resultado. Success para correcto y Danger para Error. Se puede indicar cualquier otro color de Ionic
   */
  async presentToast(mensaje: string, estado: string) {

    const toast = await this.toastCtrl.create({
      message: mensaje,
      color: estado,
      duration: 3000,
     
    });

    await toast.present();
  
  }

}
