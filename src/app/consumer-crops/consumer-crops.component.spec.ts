import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerCropsComponent } from './consumer-crops.component';

describe('ConsumerCropsComponent', () => {
  let component: ConsumerCropsComponent;
  let fixture: ComponentFixture<ConsumerCropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerCropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
