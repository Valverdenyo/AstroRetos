import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsResponse, Article } from '../interfaces/news';
import { map } from 'rxjs/operators';

const apiKey = environment.news.apiKey;
const apiUrl = environment.news.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class NewsService {




  constructor(private http: HttpClient) { }

  private executeQuery<T>() {
    return this.http.get<T>(`${apiUrl}`, {
      params: {
        access_key: apiKey,
        languages: 'es,en',
        categories: 'science',
        keywords: 'astronomy',
        
      }
    })
  }

  getNews(): Observable<Article[]> {
    return this.executeQuery<NewsResponse>()
      .pipe(
        map(({ articles }) => articles)
      );
  }

}
