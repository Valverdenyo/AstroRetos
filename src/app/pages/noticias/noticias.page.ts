import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Article } from 'src/app/interfaces/news';
import { AuthService } from 'src/app/services/auth.service';
import { NewsService } from '../../services/news.service';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  public articles: Article[] = [];

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;

  constructor(private newsSvc: NewsService) { }

  ngOnInit() {

    this.newsSvc.getNews()
      .subscribe(articles => this.articles.push(...articles));
  }

  cargarNoticias() {
    this.newsSvc.getNews()
      .subscribe(articles => {
        this.articles = articles;

        if (articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          return;
        }

        setTimeout(() => {
          this.infiniteScroll.complete();
        }, 1000);

      })
  }

}


