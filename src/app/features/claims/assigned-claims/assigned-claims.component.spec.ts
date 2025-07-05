import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedClaimsComponent } from './assigned-claims.component';

describe('AssignedClaimsComponent', () => {
  let component: AssignedClaimsComponent;
  let fixture: ComponentFixture<AssignedClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedClaimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
