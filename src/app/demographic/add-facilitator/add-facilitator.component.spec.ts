import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacilitatorComponent } from './add-facilitator.component';

describe('AddFacilitatorComponent', () => {
  let component: AddFacilitatorComponent;
  let fixture: ComponentFixture<AddFacilitatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFacilitatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFacilitatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
