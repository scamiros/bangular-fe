import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaPodChartComponent } from './insta-pod-chart.component';

describe('InstaPodChartComponent', () => {
  let component: InstaPodChartComponent;
  let fixture: ComponentFixture<InstaPodChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaPodChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaPodChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
