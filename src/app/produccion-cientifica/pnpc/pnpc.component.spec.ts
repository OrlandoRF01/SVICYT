import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnpcComponent } from './pnpc.component';

describe('PnpcComponent', () => {
  let component: PnpcComponent;
  let fixture: ComponentFixture<PnpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnpcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PnpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
