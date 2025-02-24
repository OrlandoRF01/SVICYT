import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../session-timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  seccionActiva: string = 'informacionGeneral';
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;

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

  constructor(private sessionTimerService: SessionTimerService, private router: Router) { }

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

