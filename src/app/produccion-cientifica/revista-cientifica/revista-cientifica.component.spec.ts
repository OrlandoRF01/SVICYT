import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevistaCientificaComponent } from './revista-cientifica.component';

describe('RevistaCientificaComponent', () => {
  let component: RevistaCientificaComponent;
  let fixture: ComponentFixture<RevistaCientificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevistaCientificaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevistaCientificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
