import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtsListComponent } from './hts-list.component';

describe('HtsListComponent', () => {
  let component: HtsListComponent;
  let fixture: ComponentFixture<HtsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HtsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
