import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerwithdrawComponent } from './farmerwithdraw.component';

describe('FarmerwithdrawComponent', () => {
  let component: FarmerwithdrawComponent;
  let fixture: ComponentFixture<FarmerwithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerwithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerwithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
