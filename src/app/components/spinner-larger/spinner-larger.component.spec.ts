import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerLargerComponent } from './spinner-larger.component';

describe('SpinnerLargerComponent', () => {
  let component: SpinnerLargerComponent;
  let fixture: ComponentFixture<SpinnerLargerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerLargerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerLargerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
