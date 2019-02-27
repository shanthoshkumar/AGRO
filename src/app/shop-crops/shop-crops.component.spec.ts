import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCropsComponent } from './shop-crops.component';

describe('ShopCropsComponent', () => {
  let component: ShopCropsComponent;
  let fixture: ComponentFixture<ShopCropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
