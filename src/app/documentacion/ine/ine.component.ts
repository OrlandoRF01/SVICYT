import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';

interface Ine {
  imagen: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-ine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ine.component.html',
  styleUrls: ['./ine.component.css']
})
export class IneComponent implements OnInit, OnDestroy {
  seccionActiva: string = 'documentos';
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  ineList: Ine[] = [];
  ineForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  ineEnEdicion: Ine | null = null;

  menuAbierto: boolean = false;
  submenuAbierto: boolean = false;

  documentos = {
    credencialINE: '',
    documentoProbatorioAdscripcionInstitucional: '',
    documentoProbatorioParticipacionProyectos: '',
    documentoProbatorioProduccionCientifica: '',
    inicioProduccionCientifica: ''
  };

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService, private router: Router) {
    this.ineForm = this.fb.group({
      imagen: [null, Validators.required]
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
    this.ineForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.ineForm.reset();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.ineForm.patchValue({
          imagen: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  guardarIne() {
    if (this.ineForm.valid) {
      if (this.modoEdicion && this.ineEnEdicion) {
        const index = this.ineList.indexOf(this.ineEnEdicion);
        this.ineList[index] = this.ineForm.value;
      } else {
        this.ineList.push(this.ineForm.value);
      }
      this.cerrarModal();
    }
  }

  editarIne(ine: Ine) {
    this.modoEdicion = true;
    this.ineEnEdicion = ine;
    this.ineForm.patchValue(ine);
    this.modalVisible = true;
  }

  eliminarIne(ine: Ine) {
    const index = this.ineList.indexOf(ine);
    if (index > -1) {
      this.ineList.splice(index, 1);
    }
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
