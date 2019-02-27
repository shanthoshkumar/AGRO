import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierwithdrawComponent } from './supplierwithdraw.component';

describe('SupplierwithdrawComponent', () => {
  let component: SupplierwithdrawComponent;
  let fixture: ComponentFixture<SupplierwithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierwithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierwithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
