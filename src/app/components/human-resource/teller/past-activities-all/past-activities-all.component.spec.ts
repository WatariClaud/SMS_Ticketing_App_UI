import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastActivitiesAllComponent } from './past-activities-all.component';

describe('PastActivitiesAllComponent', () => {
  let component: PastActivitiesAllComponent;
  let fixture: ComponentFixture<PastActivitiesAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastActivitiesAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastActivitiesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
