import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCreateComponent } from './complete-create.component';

describe('CompleteCreateComponent', () => {
  let component: CompleteCreateComponent;
  let fixture: ComponentFixture<CompleteCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteCreateComponent]
    });
    fixture = TestBed.createComponent(CompleteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
