import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpersonalesComponent } from './dpersonales.component';

describe('DpersonalesComponent', () => {
  let component: DpersonalesComponent;
  let fixture: ComponentFixture<DpersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpersonalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
