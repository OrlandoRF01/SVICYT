import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioProduccionCientificaComponent } from './inicio-produccion-cientifica.component';

describe('InicioProduccionCientificaComponent', () => {
  let component: InicioProduccionCientificaComponent;
  let fixture: ComponentFixture<InicioProduccionCientificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioProduccionCientificaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioProduccionCientificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
