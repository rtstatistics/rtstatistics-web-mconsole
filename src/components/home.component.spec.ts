import {
  it,
  inject,
  describe,
  beforeEachProviders,
  expect
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
describe('Home', () => {
  beforeEachProviders(() => [
    HomeComponent
  ]);
  it ('should work', inject([HomeComponent], (app: HomeComponent) => {
    // Add real test here
    expect(2).toBe(2);
  }));
  it('should have hello property', inject([HomeComponent], (home: HomeComponent) =>  {
    expect(home.title).toBe('Hello World!');
  }));
});