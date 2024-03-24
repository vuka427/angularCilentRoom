import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitesComponent } from './utilites.component';

describe('UtilitesComponent', () => {
  let component: UtilitesComponent;
  let fixture: ComponentFixture<UtilitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilitesComponent]
    });
    fixture = TestBed.createComponent(UtilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
