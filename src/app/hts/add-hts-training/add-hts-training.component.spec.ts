import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHtsTrainingComponent } from './add-hts-training.component';

describe('AddHtsTrainingComponent', () => {
  let component: AddHtsTrainingComponent;
  let fixture: ComponentFixture<AddHtsTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHtsTrainingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHtsTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
