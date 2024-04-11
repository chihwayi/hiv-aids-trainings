import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmmcListComponent } from './vmmc-list.component';

describe('VmmcListComponent', () => {
  let component: VmmcListComponent;
  let fixture: ComponentFixture<VmmcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VmmcListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VmmcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
