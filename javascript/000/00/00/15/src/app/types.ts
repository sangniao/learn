// src/app/types.ts

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoryList {
  categories: Category[];
}

export interface MediaQueriesMap {
  _type: MediaQueryType;
  _query: string;
}

export type MediaQueryType = 'prefers-reduced-motion';
