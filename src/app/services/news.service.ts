import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { NewsResponse, Article } from '../interfaces/news';

/**
 * API del servicio de noticias apinews
 */
const apiKey = environment.news.apiKey;

/**
 * URL del servicio
 */
const apiUrl = environment.news.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  /**
   * Constructor de clase
   * @param http Servicio http para solicitar la llamada a la api
   */
  constructor(private http: HttpClient) { }

  /**
   * Ejecuta la consulta a la API con los filtros pasados por el endpoint
   * @param endpoint cadena pasada con las variables que necesita la solicitud a la api
   * @returns 
   */
  private executeQuery<T>(endpoint: string) {

    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey,
        country: 'us',
      }
    });

  }

  /**
   * Devuelve un observable con las cabeceras de las noticias a mostrar.
   * Aqui pasa por parametro la categoria ciencia y espacio
   * @returns 
   */
  getTopHeadLines(): Observable<Article[]> {

    return this.executeQuery<NewsResponse>(`/top-headlines?category=science&q=space`)
      .pipe(
        map(({ articles }) => articles)
      );
      
  }

}
