import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerIdComponent } from './ledger-id.component';

describe('LedgerIdComponent', () => {
  let component: LedgerIdComponent;
  let fixture: ComponentFixture<LedgerIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
