import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaProfileComponent } from './insta-profile.component';

describe('InstaProfileComponent', () => {
  let component: InstaProfileComponent;
  let fixture: ComponentFixture<InstaProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
