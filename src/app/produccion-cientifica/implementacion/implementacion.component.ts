import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';

interface Producto {
  tipo: string;
  nombreProducto: string;
  noRegistro: string;
  fechaRegistro: string;
  referencia: string;
}

@Component({
  selector: 'app-implementacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './implementacion.component.html',
  styleUrls: ['./implementacion.component.css']
})
export class ImplementacionComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  productos: Producto[] = [];
  productosForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  productoEnEdicion: Producto | null = null;

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
    this.productosForm = this.fb.group({
      tipo: ['', Validators.required],
      nombreProducto: ['', Validators.required],
      noRegistro: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
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
    this.productosForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.productosForm.reset();
  }

  guardarProducto() {
    if (this.productosForm.valid) {
      if (this.modoEdicion && this.productoEnEdicion) {
        const index = this.productos.indexOf(this.productoEnEdicion);
        this.productos[index] = this.productosForm.value;
      } else {
        this.productos.push(this.productosForm.value);
      }
      this.cerrarModal();
    }
  }

  editarProducto(producto: Producto) {
    this.modoEdicion = true;
    this.productoEnEdicion = producto;
    this.productosForm.setValue(producto);
    this.modalVisible = true;
  }

  eliminarProducto(producto: Producto) {
    const index = this.productos.indexOf(producto);
    if (index > -1) {
      this.productos.splice(index, 1);
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
