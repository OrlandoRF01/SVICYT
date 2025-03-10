import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';
import { Subscription } from 'rxjs';

interface Proyecto {
  referencia: string;
  titulo: string;
  participacion: string;
  fechaInicio: string;
  fechaTermino: string;
  area: string;
  institucionPrincipal: string;
  institucionesAsociadas: string;
  fuenteGobFederal: boolean;
  fuenteGobEstatal: boolean;
  fuenteConacyt: boolean;
  fuenteONG: boolean;
  fuenteFomix: boolean;
  fuenteInstitucion: boolean;
  fuenteOtro: boolean;
  montoFinanciamiento: string;
  reporteTecnico: boolean;
  prototipo: boolean;
  publicacion: boolean;
  usuarios: string;
}


@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  proyectos: Proyecto[] = [];
  proyectoForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  proyectoEnEdicion: Proyecto | null = null;

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

  fuentesFinanciamiento = [
    'Gob. Federal', 'Gob. Estatal', 'CONACYT', 'ONG', 'FOMIX', 'Institución perteneciente', 'Otro'
  ];
  productosDerivados = ['Reporte técnico', 'Prototipo', 'Publicación'];

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService, private router: Router) {
    this.proyectoForm = this.fb.group({
      referencia: ['', Validators.required],
      titulo: ['', Validators.required],
      participacion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
      area: ['', Validators.required],
      institucionPrincipal: ['', Validators.required],
      institucionesAsociadas: [''],
      fuenteFinanciamiento: ['', Validators.required], // Se usa radio en vez de checkbox
      montoFinanciamiento: ['', Validators.required],
      productoDerivado: ['', Validators.required], // Se usa radio en vez de checkbox
      usuarios: ['']
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
    this.proyectoForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.proyectoForm.reset();
  }

  guardarProyecto() {
    if (this.proyectoForm.valid) {
      if (this.modoEdicion && this.proyectoEnEdicion) {
        const index = this.proyectos.indexOf(this.proyectoEnEdicion);
        this.proyectos[index] = this.proyectoForm.value;
      } else {
        this.proyectos.push(this.proyectoForm.value);
      }
      this.cerrarModal();
    }
  }

  editarProyecto(proyecto: Proyecto) {
    this.modoEdicion = true;
    this.proyectoEnEdicion = proyecto;
    this.proyectoForm.setValue(proyecto);
    this.modalVisible = true;
  }

  eliminarProyecto(proyecto: Proyecto) {
    const index = this.proyectos.indexOf(proyecto);
    if (index > -1) {
      this.proyectos.splice(index, 1);
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
