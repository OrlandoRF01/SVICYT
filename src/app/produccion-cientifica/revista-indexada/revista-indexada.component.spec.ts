import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevistaIndexadaComponent } from './revista-indexada.component';

describe('RevistaIndexadaComponent', () => {
  let component: RevistaIndexadaComponent;
  let fixture: ComponentFixture<RevistaIndexadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevistaIndexadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevistaIndexadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
