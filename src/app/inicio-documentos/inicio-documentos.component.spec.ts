import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDocumentosComponent } from './inicio-documentos.component';

describe('InicioDocumentosComponent', () => {
  let component: InicioDocumentosComponent;
  let fixture: ComponentFixture<InicioDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioDocumentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
