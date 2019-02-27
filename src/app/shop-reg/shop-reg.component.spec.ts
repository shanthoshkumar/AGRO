import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRegComponent } from './shop-reg.component';

describe('ShopRegComponent', () => {
  let component: ShopRegComponent;
  let fixture: ComponentFixture<ShopRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
