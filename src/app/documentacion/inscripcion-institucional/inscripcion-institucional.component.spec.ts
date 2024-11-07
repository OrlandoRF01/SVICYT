import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionInstitucionalComponent } from './inscripcion-institucional.component';

describe('InscripcionInstitucionalComponent', () => {
  let component: InscripcionInstitucionalComponent;
  let fixture: ComponentFixture<InscripcionInstitucionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionInstitucionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionInstitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
