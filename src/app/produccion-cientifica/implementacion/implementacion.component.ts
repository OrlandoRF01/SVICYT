import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
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
}
