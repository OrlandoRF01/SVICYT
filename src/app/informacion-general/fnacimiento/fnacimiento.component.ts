import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-fnacimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './fnacimiento.component.html',
  styleUrl: './fnacimiento.component.css'
})
export class FnacimientoComponent implements OnInit, OnDestroy {
  birthPlaceForm!: FormGroup;
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.tiempoSubscription = this.sessionTimerService.iniciarTemporizador().subscribe(
      tiempo => this.tiempoRestante = tiempo
    );
  }

  ngOnDestroy() {
    if (this.tiempoSubscription) {
      this.tiempoSubscription.unsubscribe();
    }
  }

  formatoTiempo(): string {
    return this.sessionTimerService.formatoTiempo(this.tiempoRestante);
  }

  initForm() {
    this.birthPlaceForm = this.fb.group({
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      ciudad: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      numeroFM: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.birthPlaceForm.valid) {
      console.log('Form submitted', this.birthPlaceForm.value);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.birthPlaceForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.birthPlaceForm.get(fieldName);
    return field!.invalid && (field!.dirty || field!.touched);
  }
}
