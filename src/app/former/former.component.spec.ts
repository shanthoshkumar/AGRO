import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormerComponent } from './former.component';

describe('FormerComponent', () => {
  let component: FormerComponent;
  let fixture: ComponentFixture<FormerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
