import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTraineesComponent } from './add-trainees.component';

describe('AddTraineesComponent', () => {
  let component: AddTraineesComponent;
  let fixture: ComponentFixture<AddTraineesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTraineesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTraineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
