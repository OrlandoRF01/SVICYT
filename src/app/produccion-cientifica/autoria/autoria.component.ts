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

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
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
}
