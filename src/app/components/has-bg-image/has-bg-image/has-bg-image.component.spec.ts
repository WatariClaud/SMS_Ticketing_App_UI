import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasBgImageComponent } from './has-bg-image.component';

describe('HasBgImageComponent', () => {
  let component: HasBgImageComponent;
  let fixture: ComponentFixture<HasBgImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HasBgImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HasBgImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
