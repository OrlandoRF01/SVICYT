import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionTimerService } from '../../session-timer.service';

interface Pnpc {
  nivel: string;
  titulo: string;
  institucion: string;
  anio: number;
}

@Component({
  selector: 'app-pnpc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pnpc.component.html',
  styleUrls: ['./pnpc.component.css']
})
export class PnpcComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  pnpcs: Pnpc[] = [];
  pnpcForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  pnpcEnEdicion: Pnpc | null = null;

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
    this.pnpcForm = this.fb.group({
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
    this.pnpcForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.pnpcForm.reset();
  }

  guardarPnpc() {
    if (this.pnpcForm.valid) {
      if (this.modoEdicion && this.pnpcEnEdicion) {
        const index = this.pnpcs.indexOf(this.pnpcEnEdicion);
        this.pnpcs[index] = this.pnpcForm.value;
      } else {
        this.pnpcs.push(this.pnpcForm.value);
      }
      this.cerrarModal();
    }
  }

  editarPnpc(pnpc: Pnpc) {
    this.modoEdicion = true;
    this.pnpcEnEdicion = pnpc;
    this.pnpcForm.setValue(pnpc);
    this.modalVisible = true;
  }

  eliminarPnpc(pnpc: Pnpc) {
    const index = this.pnpcs.indexOf(pnpc);
    if (index > -1) {
      this.pnpcs.splice(index, 1);
    }
  }
}
