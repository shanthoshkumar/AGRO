import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopwithdrawComponent } from './shopwithdraw.component';

describe('ShopwithdrawComponent', () => {
  let component: ShopwithdrawComponent;
  let fixture: ComponentFixture<ShopwithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopwithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopwithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
