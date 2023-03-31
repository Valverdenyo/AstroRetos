interface RootObject {
  pagination: Pagination;
  data: Article[];
}

export interface Article {
  author?: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image?: string;
  category: string;
  language: string;
  country: string;
  published_at: string;
}

export interface NewsResponse {
  status:       string;
  totalResults: number;
  articles:     Article[];
}

interface Pagination {
  limit: number;
  offset: number;
  count: number;
  total: number;
}