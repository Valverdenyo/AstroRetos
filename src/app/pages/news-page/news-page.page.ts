import { Component, OnInit } from '@angular/core';

import { NewsService } from '../../services/news.service';
import { MenuService } from 'src/app/services/menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Article } from 'src/app/interfaces/news';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.page.html',
  styleUrls: ['./news-page.page.scss'],
})
export class NewsPagePage implements OnInit {

  /**
   * Variable pública para manejo de los artículos
   */
  public articles: Article[] = [];

  /**
   * email del usuario logado
   */
  email: string;

  /**
   * Objeto del usuario logado
   */
  usuario: Usuario;
  /**
   * Variable para guardar la pagina cargada
   */
  page = 1;
  /**
   * Numero de noticias por pagina
   */
  pageSize = 10;

  /**
   * Contructor de clase
   * @param menuSvc Servicio que controla los elementos a mostrar en el menú
   * @param authSvc Servicio para comprobar el usuario logado
   * @param userSvc Servicio para manejar los datos del usuario
   * @param newsSvc Servicio de carga de noticias
   */
  constructor(public menuSvc: MenuService,
    public authSvc: AuthService,
    public userSvc: UserService,
    private newsSvc: NewsService) { 

      this.menuSvc.setMenu();

    }

    /**
     * Metodo de inicio
     * Comprueba el usuario logado para posteriormente cargar su menu
     * Carga las noticias
     */
  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.email = email;
      this.userSvc.getUserByEmail(email).subscribe(usuario => {
        this.usuario = usuario;
      });
    });

    this.loadNews();

  }

  /**
   * Carga las cabeceras de las noticias
   */
  loadNews() {
    this.newsSvc.getTopHeadLines()
      .subscribe(articles => this.articles.push(...articles));
  }

  /**
   * Carga más noticias pasando de pagina
   * @param event Evento que desencadena la carga de mas noticias: llegar casi al final de las ya cargadas
   */
  loadMore(event) {
    this.page++;
    this.loadNews();
    event.target.complete();
  }

  /**
   * Usado para desencadenar la carga de noticias
   * @param event Evento desencadenador
   */
  onScroll(event) {
    const scrollElement = event.target;
    const scrollHeight = scrollElement.scrollHeight;

  }

}
