import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVmmcTrainingComponent } from './view-vmmc-training.component';

describe('ViewVmmcTrainingComponent', () => {
  let component: ViewVmmcTrainingComponent;
  let fixture: ComponentFixture<ViewVmmcTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewVmmcTrainingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewVmmcTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
