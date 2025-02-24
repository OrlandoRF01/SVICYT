import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../session-timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio-produccion-cientifica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio-produccion-cientifica.component.html',
  styleUrl: './inicio-produccion-cientifica.component.css'
})
export class InicioProduccionCientificaComponent implements OnInit, OnDestroy {
  seccionActiva: string = 'produccionCientifica';
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;

  menuAbierto: boolean = false;
  submenuAbierto: boolean = false;

  produccionCientifica = {
    autoria: '',
    proyectos: '',
    patentes: '',
    articulosRevistaIndexada: '',
    articulosRevistaDivulgacionCientifica: '',
    implementacionTecnologica: '',
    gradosAcademicosPNPC: '',
    formaObtencionGrados: '',
    sni: '',
    estancias: ''
    
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
    if (campo === 'autoria') {
      this.router.navigate(['/autoria']);
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

    if (seccion === 'produccionCientifica') {
      this.submenuAbierto = !this.submenuAbierto;
      return;
    }
    switch (seccion) {
      case 'produccionCientifica':
        this.router.navigate(['/inicioProduccionCientifica']);
        break;
      case 'autoria':
        this.router.navigate(['/autoria']);
        break;
      case 'proyectos':
        this.router.navigate(['/proyectos']);
        break;
      case 'patentes':
        this.router.navigate(['/patentes']);
        break;
      case 'articulosRevistaIndexada':
        this.router.navigate(['/articulosRevistaIndexada']);
        break;
      case 'articulosRevistaDivulgacionCientifica':
        this.router.navigate(['/articulosRevistaDivulgacionCientifica']);
        break;
      case 'implementacionTecnologica':
        this.router.navigate(['/implementacionTecnologica']);
        break;
      case 'gradosAcademicosPNPC':
        this.router.navigate(['/gradosAcademicosPNPC']);
        break;
      case 'formaObtencionGrados':
        this.router.navigate(['/formaObtencionGrados']);
        break;
      case 'sni':
        this.router.navigate(['/sni']);
        break;
      case 'estancias':
        this.router.navigate(['/estancias']);
        break;
      case 'inicio':
        this.router.navigate(['/inicio']);
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
