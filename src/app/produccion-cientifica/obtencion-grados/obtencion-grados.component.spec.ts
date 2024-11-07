import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtencionGradosComponent } from './obtencion-grados.component';

describe('ObtencionGradosComponent', () => {
  let component: ObtencionGradosComponent;
  let fixture: ComponentFixture<ObtencionGradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtencionGradosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtencionGradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
