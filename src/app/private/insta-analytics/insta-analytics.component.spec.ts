import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaAnalyticsComponent } from './insta-analytics.component';

describe('InstaAnalyticsComponent', () => {
  let component: InstaAnalyticsComponent;
  let fixture: ComponentFixture<InstaAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
