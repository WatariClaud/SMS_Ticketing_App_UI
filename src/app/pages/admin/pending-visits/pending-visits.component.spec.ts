import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingVisitsComponent } from './pending-visits.component';

describe('PendingVisitsComponent', () => {
  let component: PendingVisitsComponent;
  let fixture: ComponentFixture<PendingVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingVisitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
