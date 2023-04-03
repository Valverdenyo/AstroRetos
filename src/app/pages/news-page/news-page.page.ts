import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces/news';
import { NewsService } from '../../services/news.service';
import { MenuService } from 'src/app/services/menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.page.html',
  styleUrls: ['./news-page.page.scss'],
})
export class NewsPagePage implements OnInit {

  public articles: Article[] = [];
  email: string;
  usuario: Usuario;
  page = 1;
  pageSize = 10;

  constructor(public menuSvc: MenuService,
    public authSvc: AuthService,
    public userSvc: UserService,
    private newsSvc: NewsService) { }

  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.email = email;
      this.userSvc.getUserByEmail(email).subscribe(usuario => {
        this.usuario = usuario;
      });
    });

    this.loadNews();

  }

  loadNews() {
    this.newsSvc
      .getNews(this.page, this.pageSize)
      .subscribe((data: any) => {
        this.articles = [...this.articles, ...data.data];
      });
  }

  loadMore(event) {
    this.page++;
    this.loadNews();
    event.target.complete();
  }

  onScroll(event) {
    const scrollElement = event.target;
    const scrollHeight = scrollElement.scrollHeight;

  }

}
