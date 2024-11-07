import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../../session-timer.service';
import { Subscription } from 'rxjs';

interface Proyecto {
  referencia: string;
  titulo: string;
  participacion: string;
  fechaInicio: string;
  fechaTermino: string;
  area: string;
  institucionPrincipal: string;
  institucionesAsociadas: string;
  fuenteGobFederal: boolean;
  fuenteGobEstatal: boolean;
  fuenteConacyt: boolean;
  fuenteONG: boolean;
  fuenteFomix: boolean;
  fuenteInstitucion: boolean;
  fuenteOtro: boolean;
  montoFinanciamiento: string;
  reporteTecnico: boolean;
  prototipo: boolean;
  publicacion: boolean;
  usuarios: string;
}


@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  proyectos: Proyecto[] = [];
  proyectoForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  proyectoEnEdicion: Proyecto | null = null;

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
    this.proyectoForm = this.fb.group({
      referencia: ['', Validators.required],
      titulo: ['', Validators.required],
      participacion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
      area: ['', Validators.required],
      institucionPrincipal: ['', Validators.required],
      institucionesAsociadas: [''],
      fuenteGobFederal: [false],
      fuenteGobEstatal: [false],
      fuenteConacyt: [false],
      fuenteONG: [false],
      fuenteFomix: [false],
      fuenteInstitucion: [false],
      fuenteOtro: [false],
      montoFinanciamiento: ['', Validators.required],
      reporteTecnico: [false],
      prototipo: [false],
      publicacion: [false],
      usuarios: ['']
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
    this.proyectoForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.proyectoForm.reset();
  }

  guardarProyecto() {
    if (this.proyectoForm.valid) {
      if (this.modoEdicion && this.proyectoEnEdicion) {
        const index = this.proyectos.indexOf(this.proyectoEnEdicion);
        this.proyectos[index] = this.proyectoForm.value;
      } else {
        this.proyectos.push(this.proyectoForm.value);
      }
      this.cerrarModal();
    }
  }

  editarProyecto(proyecto: Proyecto) {
    this.modoEdicion = true;
    this.proyectoEnEdicion = proyecto;
    this.proyectoForm.setValue(proyecto);
    this.modalVisible = true;
  }

  eliminarProyecto(proyecto: Proyecto) {
    const index = this.proyectos.indexOf(proyecto);
    if (index > -1) {
      this.proyectos.splice(index, 1);
    }
  }
}
