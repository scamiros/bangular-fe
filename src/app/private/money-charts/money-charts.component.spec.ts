import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyChartsComponent } from './money-charts.component';

describe('MoneyChartsComponent', () => {
  let component: MoneyChartsComponent;
  let fixture: ComponentFixture<MoneyChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
