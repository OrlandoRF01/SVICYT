import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FnacimientoComponent } from './fnacimiento.component';

describe('FnacimientoComponent', () => {
  let component: FnacimientoComponent;
  let fixture: ComponentFixture<FnacimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FnacimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FnacimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
