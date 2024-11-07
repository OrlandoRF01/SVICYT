import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbatorioProduccionComponent } from './probatorio-produccion.component';

describe('ProbatorioProduccionComponent', () => {
  let component: ProbatorioProduccionComponent;
  let fixture: ComponentFixture<ProbatorioProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProbatorioProduccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbatorioProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
