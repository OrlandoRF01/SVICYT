import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-domicilio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './domicilio.component.html',
  styleUrl: './domicilio.component.css'
})
export class DomicilioComponent implements OnInit, OnDestroy {
  domicilioForm!: FormGroup;
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;

  paises: string[] = ['México', 'Estados Unidos', 'Canadá'];
  estados: string[] = [];
  municipios: string[] = [];
  codigoPostalError: boolean = false;

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
    this.domicilioForm = this.fb.group({
      codigoPostal: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      colonia: ['', Validators.required],
      municipio: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required]
    });
  }

  validarCodigoPostal() {
    const codigoPostal = this.domicilioForm.get('codigoPostal')?.value;
    if (!codigoPostal || !codigoPostal.startsWith('7')) {
      this.codigoPostalError = true;
    } else {
      this.codigoPostalError = false;
    }
  }

  onPaisChange() {
    const paisSeleccionado = this.domicilioForm.get('pais')?.value;
    if (paisSeleccionado === 'México') {
      this.estados = ['Aguascalientes', 'Jalisco', 'Nuevo León'];
    } else if (paisSeleccionado === 'Estados Unidos') {
      this.estados = ['California', 'Texas', 'Florida'];
    } else if (paisSeleccionado === 'Canadá') {
      this.estados = ['Ontario', 'Quebec', 'British Columbia'];
    } else {
      this.estados = [];
    }
    this.domicilioForm.get('estado')?.setValue('');
    this.municipios = [];
    this.domicilioForm.get('municipio')?.setValue('');
  }

  onEstadoChange() {
    const estadoSeleccionado = this.domicilioForm.get('estado')?.value;
    if (estadoSeleccionado === 'Jalisco') {
      this.municipios = ['Guadalajara', 'Zapopan', 'Tlaquepaque'];
    } else if (estadoSeleccionado === 'Nuevo León') {
      this.municipios = ['Monterrey', 'San Nicolás', 'Guadalupe'];
    } else if (estadoSeleccionado === 'California') {
      this.municipios = ['Los Ángeles', 'San Francisco', 'San Diego'];
    } else {
      this.municipios = [];
    }
    this.domicilioForm.get('municipio')?.setValue('');
  }

  onSubmit() {
    if (this.domicilioForm.valid) {
      console.log('Form submitted', this.domicilioForm.value);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.domicilioForm);
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
    const field = this.domicilioForm.get(fieldName);
    return field!.invalid && (field!.dirty || field!.touched);
  }
}