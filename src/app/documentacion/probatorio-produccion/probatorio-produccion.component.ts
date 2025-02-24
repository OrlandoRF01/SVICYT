import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionTimerService } from '../../session-timer.service';
import { Router } from '@angular/router';

interface Documento {
  nombre: string;
  archivo: File;
}

@Component({
  selector: 'app-probatorio-produccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './probatorio-produccion.component.html',
  styleUrl: './probatorio-produccion.component.css'
})
export class ProbatorioProduccionComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
    private tiempoSubscription: Subscription | undefined;
    documentos: Documento[] = [];
    documentoForm: FormGroup;
    modalVisible = false;
    documentoValido = false;
    error: string | null = null;
  
    seccionActiva: string = 'documento';
    menuAbierto: boolean = false;
    submenuAbierto: boolean = false;
  
    documento = {
      credencialINE: '',
      documentoProbatorioAdscripcionInstitucional: '',
      documentoProbatorioParticipacionProyectos: '',
      documentoProbatorioProduccionCientifica: '',
      inicioProduccionCientifica: ''
    };
  

  constructor(
    private fb: FormBuilder,
    private sessionTimerService: SessionTimerService,
    private router: Router
  ) {
    this.documentoForm = this.fb.group({});
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
    this.documentoValido = false;
    this.error = null;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.error = null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.documentoValido = true;
      this.error = null;
    } else {
      this.documentoValido = false;
      this.error = "El archivo debe ser un PDF válido.";
    }
  }

  guardarDocumento() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file && file.type === 'application/pdf') {
      const nuevoDocumento: Documento = { nombre: file.name, archivo: file };
      this.documentos.push(nuevoDocumento);
      this.cerrarModal();
    } else {
      this.error = "El archivo debe ser un PDF válido.";
    }
  }

  eliminarDocumento(documento: Documento) {
    const index = this.documentos.indexOf(documento);
    if (index > -1) {
      this.documentos.splice(index, 1);
    }
  }

  abrirDocumento(documento: Documento) {
    const fileUrl = URL.createObjectURL(documento.archivo);
    window.open(fileUrl, '_blank');
    setTimeout(() => {
      URL.revokeObjectURL(fileUrl);
    }, 1000);
  }

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  navegarAComponente(campo: string, seccion: string,) {
    this.seccionActiva = campo;
    this.cerrarMenu();
    if (campo === 'documentoProbatorioProduccionCientifica') {
      this.router.navigate(['/documentoProbatorioProduccionCientifica']);
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

    if (seccion === 'documento') {
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
      case 'documento':
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
