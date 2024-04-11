import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVmmcTrainingComponent } from './add-vmmc-training.component';

describe('AddVmmcTrainingComponent', () => {
  let component: AddVmmcTrainingComponent;
  let fixture: ComponentFixture<AddVmmcTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVmmcTrainingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVmmcTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
