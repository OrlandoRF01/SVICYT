import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionTimerService } from '../../session-timer.service';

interface Grado {
  nivel: string;
  titulo: string;
  institucion: string;
  ano: number;
}

@Component({
  selector: 'app-obtencion-grados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './obtencion-grados.component.html',
  styleUrls: ['./obtencion-grados.component.css']
})
export class ObtencionGradosComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  grados: Grado[] = [];
  gradosForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  gradoEnEdicion: Grado | null = null;

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
    this.gradosForm = this.fb.group({
      nivel: ['', Validators.required],
      titulo: ['', Validators.required],
      institucion: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
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
    this.gradosForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.gradosForm.reset();
  }

  guardarGrado() {
    if (this.gradosForm.valid) {
      if (this.modoEdicion && this.gradoEnEdicion) {
        const index = this.grados.indexOf(this.gradoEnEdicion);
        this.grados[index] = this.gradosForm.value;
      } else {
        this.grados.push(this.gradosForm.value);
      }
      this.cerrarModal();
    }
  }

  editarGrado(grado: Grado) {
    this.modoEdicion = true;
    this.gradoEnEdicion = grado;
    this.gradosForm.setValue(grado);
    this.modalVisible = true;
  }

  eliminarGrado(grado: Grado) {
    const index = this.grados.indexOf(grado);
    if (index > -1) {
      this.grados.splice(index, 1);
    }
  }
}
