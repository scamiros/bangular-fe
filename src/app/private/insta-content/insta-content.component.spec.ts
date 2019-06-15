import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaContentComponent } from './insta-content.component';

describe('InstaContentComponent', () => {
  let component: InstaContentComponent;
  let fixture: ComponentFixture<InstaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
