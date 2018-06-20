import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgradeformComponent } from './addgradeform.component';

describe('AddgradeformComponent', () => {
  let component: AddgradeformComponent;
  let fixture: ComponentFixture<AddgradeformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgradeformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgradeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
