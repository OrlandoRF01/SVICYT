import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionTimerService } from '../../session-timer.service';

interface Estancia {
  institucion: string;
  proyecto: string;
  fechaInicio: string;
  fechaTermino: string;
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

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
    this.estanciasForm = this.fb.group({
      institucion: ['', Validators.required],
      proyecto: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
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
  }

  cerrarModal() {
    this.modalVisible = false;
    this.estanciasForm.reset();
  }

  guardarEstancia() {
    if (this.estanciasForm.valid) {
      if (this.modoEdicion && this.estanciaEnEdicion) {
        const index = this.estancias.indexOf(this.estanciaEnEdicion);
        this.estancias[index] = this.estanciasForm.value;
      } else {
        this.estancias.push(this.estanciasForm.value);
      }
      this.cerrarModal();
    }
  }

  editarEstancia(estancia: Estancia) {
    this.modoEdicion = true;
    this.estanciaEnEdicion = estancia;
    this.estanciasForm.setValue(estancia);
    this.modalVisible = true;
  }

  eliminarEstancia(estancia: Estancia) {
    const index = this.estancias.indexOf(estancia);
    if (index > -1) {
      this.estancias.splice(index, 1);
    }
  }
}
