import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dpersonales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dpersonales.component.html',
  styleUrl: './dpersonales.component.css'
})
export class DpersonalesComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
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
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      rfc: ['', Validators.required],
      curp: ['', Validators.required],
      sexo: ['', Validators.required] 
    });
  }


  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted', this.contactForm.value);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.contactForm);
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
    const field = this.contactForm.get(fieldName);
    return field!.invalid && (field!.dirty || field!.touched);
  }
}