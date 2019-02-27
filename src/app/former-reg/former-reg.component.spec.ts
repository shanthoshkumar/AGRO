import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormerRegComponent } from './former-reg.component';

describe('FormerRegComponent', () => {
  let component: FormerRegComponent;
  let fixture: ComponentFixture<FormerRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormerRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormerRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
