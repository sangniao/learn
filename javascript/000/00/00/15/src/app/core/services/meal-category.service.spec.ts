import { TestBed } from '@angular/core/testing';

import { MealCategoryService } from './meal-category.service';

describe('MealCategoryService', () => {
  let service: MealCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
