import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionTimerService } from '../../session-timer.service';

interface Articulo {
  titulo: string;
  autor: string;
  fechaAceptado: string;
  fechaPublicado: string;
  nombreRevista: string;
  pertenece: string;
  referencia: string;
}

@Component({
  selector: 'app-revista-indexada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './revista-indexada.component.html',
  styleUrls: ['./revista-indexada.component.css']
})
export class RevistaIndexadaComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  articulos: Articulo[] = [];
  articulosForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  articuloEnEdicion: Articulo | null = null;

  seccionActiva: string = 'produccionCientifica';
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


  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService, private router: Router) {
    this.articulosForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      fechaAceptado: ['', Validators.required],
      fechaPublicado: ['', Validators.required],
      nombreRevista: ['', Validators.required],
      pertenece: ['', Validators.required],
      referencia: ['', Validators.required],
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
    this.articulosForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.articulosForm.reset();
  }

  guardarArticulo() {
    if (this.articulosForm.valid) {
      if (this.modoEdicion && this.articuloEnEdicion) {
        const index = this.articulos.indexOf(this.articuloEnEdicion);
        this.articulos[index] = this.articulosForm.value;
      } else {
        this.articulos.push(this.articulosForm.value);
      }
      this.cerrarModal();
    }
  }

  editarArticulo(articulo: Articulo) {
    this.modoEdicion = true;
    this.articuloEnEdicion = articulo;
    this.articulosForm.setValue(articulo);
    this.modalVisible = true;
  }

  eliminarArticulo(articulo: Articulo) {
    const index = this.articulos.indexOf(articulo);
    if (index > -1) {
      this.articulos.splice(index, 1);
    }
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
