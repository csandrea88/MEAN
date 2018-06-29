import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrelComponent } from './addrel.component';

describe('AddrelComponent', () => {
  let component: AddrelComponent;
  let fixture: ComponentFixture<AddrelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
