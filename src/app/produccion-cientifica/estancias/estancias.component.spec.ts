import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanciasComponent } from './estancias.component';

describe('EstanciasComponent', () => {
  let component: EstanciasComponent;
  let fixture: ComponentFixture<EstanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstanciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
