import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingActivitiesComponent } from './pending-activities.component';

describe('PendingActivitiesComponent', () => {
  let component: PendingActivitiesComponent;
  let fixture: ComponentFixture<PendingActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
