import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactComponent } from './create.transact.component';

describe('CreateTransactComponent', () => {
  let component: CreateTransactComponent;
  let fixture: ComponentFixture<CreateTransactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTransactComponent]
    });
    fixture = TestBed.createComponent(CreateTransactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
