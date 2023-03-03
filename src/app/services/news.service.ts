import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiKey = environment.news.apiKey;
const apiUrl = environment.news.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor() { }
}
