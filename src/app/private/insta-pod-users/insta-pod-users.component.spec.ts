import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaPodUsersComponent } from './insta-pod-users.component';

describe('InstaPodUsersComponent', () => {
  let component: InstaPodUsersComponent;
  let fixture: ComponentFixture<InstaPodUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaPodUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaPodUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
