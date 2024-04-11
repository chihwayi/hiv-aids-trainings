import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingListingComponent } from './training-listing.component';

describe('TrainingListingComponent', () => {
  let component: TrainingListingComponent;
  let fixture: ComponentFixture<TrainingListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
