import { Component, OnInit } from '@angular/core';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

/**
 * Constructor de clase
 * @param iab Componente para mostrar los enlaces a perfiles en el navegador integrado a traves de InAppBrowser
 * @param platform Componente para controlar la plataforma donde se ejecuta la app
 */
  constructor(private iab: InAppBrowser,
    private platform: Platform) { }

    /**
     * Metodo de inicio
     */
  ngOnInit() {
  }

  /**
   * Abre los perfiles 
   * @param url URL que se tiene que abrir
   * @returns 
   */
  openURL(url: string) {

    if (this.platform.is('android')) {
      const browser = this.iab.create(url);
      browser.show();
      return;
    }

  }


}
