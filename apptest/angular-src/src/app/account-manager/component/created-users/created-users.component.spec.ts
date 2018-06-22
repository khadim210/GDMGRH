import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedUsersComponent } from './created-users.component';

describe('CreatedUsersComponent', () => {
  let component: CreatedUsersComponent;
  let fixture: ComponentFixture<CreatedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
