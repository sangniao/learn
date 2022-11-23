// src/app/app.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/types';
import { fadeInDownOutUp, fadeInOut, fadeInUpOutDown } from './core/animations';
import { MealCategoryService } from './core/services/meal-category.service';
import { MediaMatchService } from './core/services/media-match.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut, fadeInUpOutDown, fadeInDownOutUp],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  categoryList: Category[] = [];
  mealCategories = new Subscription();
  public disableAnimations$ = this.mediaMatch.mediaQueryListeners$['prefers-reduced-motion'];

  constructor(
    private mealCategoryService: MealCategoryService,
    private mediaMatch: MediaMatchService
  ) {}

  ngOnInit() {
    this.mealCategories = this.mealCategoryService
      .getCategories()
      .subscribe((data) => {
        this.categoryList = data.categories;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.mealCategories.unsubscribe();
  }
}
