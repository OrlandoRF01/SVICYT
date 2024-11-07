import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionTimerService } from '../../session-timer.service';

interface Articulo {
  titulo: string;
  autor: string;
  fechaAceptado: string;
  fechaPublicado: string;
  nombreRevista: string;
  referencia: string;
}

@Component({
  selector: 'app-revista-cientifica',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './revista-cientifica.component.html',
  styleUrl: './revista-cientifica.component.css'
})
export class RevistaCientificaComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  articulos: Articulo[] = [];
  articulosForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  articuloEnEdicion: Articulo | null = null;

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
    this.articulosForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      fechaAceptado: ['', Validators.required],
      fechaPublicado: ['', Validators.required],
      nombreRevista: ['', Validators.required],
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
}
