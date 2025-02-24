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
