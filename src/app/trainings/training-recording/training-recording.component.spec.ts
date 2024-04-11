import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRecordingComponent } from './training-recording.component';

describe('TrainingRecordingComponent', () => {
  let component: TrainingRecordingComponent;
  let fixture: ComponentFixture<TrainingRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingRecordingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
