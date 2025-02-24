import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../session-timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio-documentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio-documentos.component.html',
  styleUrl: './inicio-documentos.component.css'
})
export class InicioDocumentosComponent implements OnInit, OnDestroy {
  seccionActiva: string = 'documentos';
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;

  menuAbierto: boolean = false;
  submenuAbierto: boolean = false;

  documentos = {
    credencialINE: '',
    documentoProbatorioAdscripcionInstitucional: '',
    documentoProbatorioParticipacionProyectos: '',
    documentoProbatorioProduccionCientifica: '',
    inicioProduccionCientifica: ''
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
    if (campo === 'credencialINE') {
      this.router.navigate(['/credencialINE']);
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

    if (seccion === 'documentos') {
      this.submenuAbierto = !this.submenuAbierto;
      return;
    }
    switch (seccion) {
      case 'informacionGeneral':
        this.router.navigate(['/inicio']);
        break;
      case 'produccionCientifica':
        this.router.navigate(['/inicioProduccionCientifica']);
        break;
      case 'documentos':
        this.router.navigate(['/inicioDocumentos']);
        break;
      case 'credencialINE':
        this.router.navigate(['/credencialINE']);
        break;
      case 'documentoProbatorioAdscripcionInstitucional':
        this.router.navigate(['/documentoProbatorioAdscripcionInstitucional']);
        break;
      case 'documentoProbatorioParticipacionProyectos':
        this.router.navigate(['/documentoProbatorioParticipacionProyectos']);
        break;
      case 'documentoProbatorioProduccionCientifica':
        this.router.navigate(['/documentoProbatorioProduccionCientifica']);
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