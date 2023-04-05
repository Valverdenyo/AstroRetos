import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  private executeQuery<T>(endpoint: string) {
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey,
        country: 'us',
      }
    })
  }

  getTopHeadLines(): Observable<Article[]> {
    return this.executeQuery<NewsResponse>(`/top-headlines?category=science&q=space`)
      .pipe(
        map(({ articles }) => articles)
      );
  }

}
