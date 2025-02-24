import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';

interface Formacion {
  nivel: string;
  titulo: string;
  institucion: string;
  anio: number;
}

@Component({
  selector: 'app-formacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  formaciones: Formacion[] = [];
  formacionesForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  formacionEnEdicion: Formacion | null = null;

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

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService, private router: Router) {
    this.formacionesForm = this.fb.group({
      nivel: ['', Validators.required],
      titulo: ['', Validators.required],
      institucion: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    });
  }

  ngOnInit() {
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

  mostrarModal() {
    this.modalVisible = true;
    this.modoEdicion = false;
    this.formacionesForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.formacionesForm.reset();
  }

  guardarFormacion() {
    if (this.formacionesForm.valid) {
      if (this.modoEdicion && this.formacionEnEdicion) {
        const index = this.formaciones.indexOf(this.formacionEnEdicion);
        this.formaciones[index] = this.formacionesForm.value;
      } else {
        this.formaciones.push(this.formacionesForm.value);
      }
      this.cerrarModal();
    }
  }

  editarFormacion(formacion: Formacion) {
    this.modoEdicion = true;
    this.formacionEnEdicion = formacion;
    this.formacionesForm.setValue(formacion);
    this.modalVisible = true;
  }

  eliminarFormacion(formacion: Formacion) {
    const index = this.formaciones.indexOf(formacion);
    if (index > -1) {
      this.formaciones.splice(index, 1);
    }
  }
  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  navegarAComponente(campo: string, seccion: string,) {
    this.seccionActiva = campo;
    this.cerrarMenu();
    if (campo === 'inicio') {
      this.router.navigate(['/inicio']);
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
