import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionTimerService } from '../../session-timer.service';

interface Formacion {
  nivel: string;
  titulo: string;
  institucion: string;
  anio: number;
}

@Component({
  selector: 'app-formacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  formaciones: Formacion[] = [];
  formacionesForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  formacionEnEdicion: Formacion | null = null;

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
    this.formacionesForm = this.fb.group({
      nivel: ['', Validators.required],
      titulo: ['', Validators.required],
      institucion: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
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
    this.formacionesForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.formacionesForm.reset();
  }

  guardarFormacion() {
    if (this.formacionesForm.valid) {
      if (this.modoEdicion && this.formacionEnEdicion) {
        const index = this.formaciones.indexOf(this.formacionEnEdicion);
        this.formaciones[index] = this.formacionesForm.value;
      } else {
        this.formaciones.push(this.formacionesForm.value);
      }
      this.cerrarModal();
    }
  }

  editarFormacion(formacion: Formacion) {
    this.modoEdicion = true;
    this.formacionEnEdicion = formacion;
    this.formacionesForm.setValue(formacion);
    this.modalVisible = true;
  }

  eliminarFormacion(formacion: Formacion) {
    const index = this.formaciones.indexOf(formacion);
    if (index > -1) {
      this.formaciones.splice(index, 1);
    }
  }
}
