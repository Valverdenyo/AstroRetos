import { Component, Input, OnInit } from '@angular/core';
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

  @Input() article!: Article;
  @Input() index!: number;

  constructor(private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing) { }

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
  
  
  
    openArticle() {
  
      if (this.platform.is('android')) {
        const browser = this.iab.create(this.article.url);
        browser.show();
        return;
      }
  
    }
  
    onShareArticle() {
  
      if (this.platform.is('cordova')) {
  
  
        this.compartirNoticia();
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
      
    compartirNoticia() {
  
    }


}
