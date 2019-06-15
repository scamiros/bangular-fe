import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaPodsComponent } from './insta-pods.component';

describe('InstaPodsComponent', () => {
  let component: InstaPodsComponent;
  let fixture: ComponentFixture<InstaPodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaPodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaPodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
