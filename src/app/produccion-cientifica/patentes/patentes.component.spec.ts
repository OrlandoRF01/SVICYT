import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentesComponent } from './patentes.component';

describe('PatentesComponent', () => {
  let component: PatentesComponent;
  let fixture: ComponentFixture<PatentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
