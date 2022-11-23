// src/app/core/services/meal-category.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CategoryList } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MealCategoryService {
  constructor(private http: HttpClient) {}

  private categoriesUrl = environment.api_url + '/categories.php';

  /** GET categories from the servier */
  getCategories(): Observable<CategoryList> {
    return this.http.get<CategoryList>(this.categoriesUrl).pipe(
      tap((_) => console.log('fetched categories')),
      catchError(
        this.handleError<CategoryList>('getCategories', { categories: [] })
      )
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
