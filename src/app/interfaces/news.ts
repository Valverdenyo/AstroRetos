/**
 * Interface que maneja las peticiones de noticias. API de NEWSAPI: https://newsapi.org/v2
 */
export interface NewsResponse {
  /**
   * Estado de la peticion
   */
  status:       string;

  /**
   * Resultados totales de la peticion
   */
  totalResults: number;

  /**
   * Objeto tipo Article para manejar las noticias
   */
  articles:     Article[];
}

/**
 * Interface para el manejo de las noticias
 */
export interface Article {

  /**
   * Origen de la noticia
   */
  source:       Source;

  /**
   * Autor de la noticia
   */
  author?:      string;

  /**
   * Titulo de la noticia
   */
  title:        string;

  /**
   * Descripcion corta de la noticia
   */
  description?: string;

  /**
   * URL a la noticia completa
   */
  url:          string;

  /**
   * URL a la imagen de la noticia
   */
  urlToImage?:  string;

  /**
   * Fecha de publicacion
   */
  publishedAt:  string;

  /**
   * Contenido completo de la noticia
   */
  content?:     string;
}

/**
 * Interface para el manejo del Origen de la noticia
 */
export interface Source {

  /**
   * Identificador del origen
   */
  id?:  string;

  /**
   * Nombre del Origen
   */
  name: string;
}

/**
 * Interface para manejar las noticias de una Categoria concreta y por paginas. NO SE USA
 */
export interface ArticlesByCategoryAndPage {
  [key: string] : {
      page: number,
      articles: Article[]
  }
}