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
  codigoPostalError: boolean = false;

  seccionActiva: string = 'informacionGeneral';
  menuAbierto: boolean = false;
  submenuAbierto: boolean = false;

  informacionGeneral = {
    datosPersonales: '',
    lugarNacimiento: '',
    domicilioParticular: '',
    contacto: '',
    desarrollo: '',
    FormacionAcademica: ''
  };

  constructor(private fb: FormBuilder, private router: Router, private sessionTimerService: SessionTimerService) { }

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
    window.open('https://www.correosdemexico.gob.mx/ConsultaCP', '_blank');
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

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  navegarAComponente(campo: string, seccion: string,) {
    this.seccionActiva = campo;
    this.cerrarMenu();
    if (campo === 'datosPersonales') {
      this.router.navigate(['/dpersonales']);
    }
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
    this.toggleOverlay();
  }

  toggleSubmenu() {
    this.submenuAbierto = !this.submenuAbierto;
  }

  cerrarMenu() {
    if (this.menuAbierto) {
      this.menuAbierto = false;
      this.toggleOverlay();
    }
  }

  toggleOverlay() {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      if (this.menuAbierto) {
        overlay.classList.add('visible');
      } else {
        overlay.classList.remove('visible');
      }
    }
  }

  navegarA(seccion: string) {
    this.seccionActiva = seccion;

    if (seccion === 'informacionGeneral') {
      this.submenuAbierto = !this.submenuAbierto;
      return;
    }
    switch (seccion) {
      case 'informacionGeneral':
        this.router.navigate(['/inicio']);
        break;
      case 'datosPersonales':
        this.router.navigate(['/dpersonales']);
        break;
      case 'fnacimiento':
        this.router.navigate(['/fnacimiento']);
        break;
      case 'domicilio':
        this.router.navigate(['/domicilio']);
        break;
      case 'contacto':
        this.router.navigate(['/contacto']);
        break;
      case 'desarrollo':
        this.router.navigate(['/desarrollo']);
        break;
      case 'FormacionAcademica':
        this.router.navigate(['/FormacionAcademica']);
        break;
      case 'produccionCientifica':
        this.router.navigate(['/inicioProduccionCientifica']);
        break;
      case 'documentos':
        this.router.navigate(['/inicioDocumentos']);
        break;
      case 'guiaUsuario':
        this.router.navigate(['/guia-usuario']);
        break;
      case 'logout':
        this.router.navigate(['/login']);
        break;
    }

    this.cerrarMenu();
  }
}

