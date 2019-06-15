import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyDictionaryCategoriesComponent } from './money-dictionary-categories.component';

describe('MoneyDictionaryCategoriesComponent', () => {
  let component: MoneyDictionaryCategoriesComponent;
  let fixture: ComponentFixture<MoneyDictionaryCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyDictionaryCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyDictionaryCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
