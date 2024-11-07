import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipacionProyectosComponent } from './participacion-proyectos.component';

describe('ParticipacionProyectosComponent', () => {
  let component: ParticipacionProyectosComponent;
  let fixture: ComponentFixture<ParticipacionProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipacionProyectosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipacionProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
