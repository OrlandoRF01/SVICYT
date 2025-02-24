import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';
import { Subscription } from 'rxjs';


interface Libro {
  titulo: string;
  autor: string;
  editorial: string;
  referencia: string;
}

@Component({
  selector: 'app-autoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './autoria.component.html',
  styleUrl: './autoria.component.css'
})
export class AutoriaComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  libros: Libro[] = [];
  libroForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  libroEnEdicion: Libro | null = null;

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
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      referencia: ['', Validators.required]
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
    this.libroForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.libroForm.reset();
  }

  guardarLibro() {
    if (this.libroForm.valid) {
      if (this.modoEdicion && this.libroEnEdicion) {
        const index = this.libros.indexOf(this.libroEnEdicion);
        this.libros[index] = this.libroForm.value;
      } else {
        this.libros.push(this.libroForm.value);
      }
      this.cerrarModal();
    }
  }

  editarLibro(libro: Libro) {
    this.modoEdicion = true;
    this.libroEnEdicion = libro;
    this.libroForm.setValue(libro);
    this.modalVisible = true;
  }

  eliminarLibro(libro: Libro) {
    const index = this.libros.indexOf(libro);
    if (index > -1) {
      this.libros.splice(index, 1);
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
