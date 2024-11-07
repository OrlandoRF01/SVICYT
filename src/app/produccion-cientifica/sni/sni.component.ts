import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';
import { Subscription } from 'rxjs';

interface Sni {
  year: string;
  nivel: string;
}

@Component({
  selector: 'app-sni',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sni.component.html',
  styleUrl: './sni.component.css'
})
export class SniComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  sni: Sni[] = [];
  sniForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  sniEnEdicion: Sni | null = null;

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
    this.sniForm = this.fb.group({
      year: ['', Validators.required],
      nivel: ['', Validators.required],
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
    this.sniForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.sniForm.reset();
  }

  guardarSni() {
    if (this.sniForm.valid) {
      if (this.modoEdicion && this.sniEnEdicion) {
        const index = this.sni.indexOf(this.sniEnEdicion);
        this.sni[index] = this.sniForm.value;
      } else {
        this.sni.push(this.sniForm.value);
      }
      this.cerrarModal();
    }
  }

  editarSni(sni: Sni) {
    this.modoEdicion = true;
    this.sniEnEdicion = sni;
    this.sniForm.setValue(sni);
    this.modalVisible = true;
  }

  eliminarSni(sni: Sni) {
    const index = this.sni.indexOf(sni);
    if (index > -1) {
      this.sni.splice(index, 1);
    }
  }
}
