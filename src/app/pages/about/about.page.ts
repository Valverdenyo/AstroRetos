import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private iab: InAppBrowser,
    private platform: Platform) { }

  ngOnInit() {
  }

  openURL(url: string) {

    if (this.platform.is('android')) {
      const browser = this.iab.create(url);
      browser.show();
      return;
    }

  }


}
