import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SniComponent } from './sni.component';

describe('SniComponent', () => {
  let component: SniComponent;
  let fixture: ComponentFixture<SniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
