import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/news';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent {

  public article: Article[] = [];

  @Input() articles: Article[] = [];

  constructor() { }

}
