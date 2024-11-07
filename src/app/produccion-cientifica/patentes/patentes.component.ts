import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';
import { Subscription } from 'rxjs';

interface Patentes {
  tipo: string;
  nombreProyecto: string;
  noRegistro: string;
  fechaRegistro: string;
}

@Component({
  selector: 'app-patentes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patentes.component.html',
  styleUrl: './patentes.component.css'
})
export class PatentesComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  patentes: Patentes[] = [];
  patentesForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  patentesEnEdicion: Patentes | null = null;

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
    this.patentesForm = this.fb.group({
      tipo: ['', Validators.required],
      nombreProyecto: ['', Validators.required],
      noRegistro: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
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
    this.patentesForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.patentesForm.reset();
  }

  guardarPatentes() {
    if (this.patentesForm.valid) {
      if (this.modoEdicion && this.patentesEnEdicion) {
        const index = this.patentes.indexOf(this.patentesEnEdicion);
        this.patentes[index] = this.patentesForm.value;
      } else {
        this.patentes.push(this.patentesForm.value);
      }
      this.cerrarModal();
    }
  }

  editarPatentes(patentes: Patentes) {
    this.modoEdicion = true;
    this.patentesEnEdicion = patentes;
    this.patentesForm.setValue(patentes);
    this.modalVisible = true;
  }

  eliminarPatentes(patentes: Patentes) {
    const index = this.patentes.indexOf(patentes);
    if (index > -1) {
      this.patentes.splice(index, 1);
    }
  }
}
