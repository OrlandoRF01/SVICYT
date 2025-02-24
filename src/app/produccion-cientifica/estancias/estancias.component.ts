import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';

interface Estancia {
  institucion: string;
  proyecto: string;
  fechaInicio: string;
  fechaTermino: string;
  documento: string | null;
  nombreArchivo?: string;
}

@Component({
  selector: 'app-estancias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estancias.component.html',
  styleUrls: ['./estancias.component.css']
})
export class EstanciasComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  estancias: Estancia[] = [];
  estanciasForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  estanciaEnEdicion: Estancia | null = null;
  selectedFile: File | null = null;

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
    this.estanciasForm = this.fb.group({
      institucion: ['', Validators.required],
      proyecto: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
      documento: [null]
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
    this.estanciasForm.reset();
    this.selectedFile = null;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.estanciasForm.reset();
    this.selectedFile = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.estanciasForm.patchValue({ documento: this.selectedFile, nombreArchivo: this.selectedFile.name });
    }
  }

  verDocumento(url: string) {
    window.open(url, '_blank');
  }

  guardarEstancia() {
    if (this.estanciasForm.invalid || (!this.selectedFile && !this.modoEdicion)) {
      alert('Todos los campos son obligatorios y debe seleccionarse un archivo si es un nuevo registro.');
      return;
    }

    const formData = { ...this.estanciasForm.value, nombreArchivo: this.selectedFile?.name || this.estanciaEnEdicion?.nombreArchivo || '' };

    if (this.selectedFile) {
      formData.documento = URL.createObjectURL(this.selectedFile);
    } else if (this.modoEdicion && this.estanciaEnEdicion) {
      formData.documento = this.estanciaEnEdicion.documento;
    }

    if (this.modoEdicion && this.estanciaEnEdicion) {
      const index = this.estancias.indexOf(this.estanciaEnEdicion);
      this.estancias[index] = formData;
    } else {
      this.estancias.push(formData);
    }
    this.cerrarModal();
  }

  editarEstancia(estancia: Estancia) {
    this.modoEdicion = true;
    this.estanciaEnEdicion = estancia;
    this.estanciasForm.patchValue(estancia);
    this.selectedFile = null;
    this.modalVisible = true;
  }

  eliminarEstancia(estancia: Estancia) {
    const index = this.estancias.indexOf(estancia);
    if (index > -1) {
      this.estancias.splice(index, 1);
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

