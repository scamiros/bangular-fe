import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCategoriesComponent } from './money-categories.component';

describe('MoneyCategoriesComponent', () => {
  let component: MoneyCategoriesComponent;
  let fixture: ComponentFixture<MoneyCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
