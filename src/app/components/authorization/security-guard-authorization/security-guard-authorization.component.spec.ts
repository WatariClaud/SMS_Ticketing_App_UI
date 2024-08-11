import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGuardAuthorizationComponent } from './security-guard-authorization.component';

describe('SecurityGuardAuthorizationComponent', () => {
  let component: SecurityGuardAuthorizationComponent;
  let fixture: ComponentFixture<SecurityGuardAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityGuardAuthorizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityGuardAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
