import { Component, Input } from '@angular/core';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';

import { Article } from 'src/app/interfaces/news';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent {

  /**
   * Parámetro recibido de tipo Artículo para crear un objeto para manejarlo
   */
  @Input() article!: Article;

  /**
   * Indice del arfticulo recibido
   */
  @Input() index!: number;

  /**
   * 
   * @param iab Componente de InAppBrowser para mostrar las noticias sin salir de la aplicación
   * @param platform Componente para controlar la plataforma dónde se ejecuta la aplicación. si es Android, se usará el IAB
   * @param actionSheetCtrl Componente personalizado para mostrar la opcion de compartir
   * @param socialSharing Componente para compartir la noticia a través de las aplicaciones instaladas
   */
  constructor(private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing) { }

  /**
   * Método que muestra el ActinioSheet con la opcion de compartir la noticia
   */
  async onOpenMenu() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [{
        text: 'Compartir',
        icon: 'share-outline',
        handler: () => {

          this.onShareArticle();
        }
      }, {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
        cssClass: 'secondary'
      }]
    });

    await actionSheet.present();
  }

  /**
   * Abre el articulo en el navegador. Si es Android lo muestra en el navegador dentro de la App, si es en Web, lo muestra en otra pestaña
   * @returns 
   */
  openArticle() {

    if (this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }

  }

  /**
   * Método para compartir la noticia a través de las aplicaciones instalas en el dispositivo
   */
  onShareArticle() {

    if (this.platform.is('cordova')) {

      this.socialSharing.share(
        this.article.title,
        this.article.url
      );
    } else {
      if (navigator.share) {
        navigator.share({
          title: this.article.title,
          text: this.article.description,
          url: this.article.url,
        })
          .then(() => console.log('Compartido!'))
          .catch((error) => console.log('Error compartiendo', error));
      }
    }
  }

}
