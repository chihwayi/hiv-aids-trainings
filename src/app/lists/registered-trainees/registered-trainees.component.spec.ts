import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredTraineesComponent } from './registered-trainees.component';

describe('RegisteredTraineesComponent', () => {
  let component: RegisteredTraineesComponent;
  let fixture: ComponentFixture<RegisteredTraineesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisteredTraineesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredTraineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
