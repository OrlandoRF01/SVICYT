import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionTimerService } from '../../session-timer.service';

interface Ine {
  imagen: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-ine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ine.component.html',
  styleUrls: ['./ine.component.css']
})
export class IneComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  ineList: Ine[] = [];
  ineForm: FormGroup;
  modalVisible = false;
  modoEdicion = false;
  ineEnEdicion: Ine | null = null;

  constructor(private fb: FormBuilder, private sessionTimerService: SessionTimerService) {
    this.ineForm = this.fb.group({
      imagen: [null, Validators.required]
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
    this.ineForm.reset();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.ineForm.reset();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.ineForm.patchValue({
          imagen: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  guardarIne() {
    if (this.ineForm.valid) {
      if (this.modoEdicion && this.ineEnEdicion) {
        const index = this.ineList.indexOf(this.ineEnEdicion);
        this.ineList[index] = this.ineForm.value;
      } else {
        this.ineList.push(this.ineForm.value);
      }
      this.cerrarModal();
    }
  }

  editarIne(ine: Ine) {
    this.modoEdicion = true;
    this.ineEnEdicion = ine;
    this.ineForm.patchValue(ine);
    this.modalVisible = true;
  }

  eliminarIne(ine: Ine) {
    const index = this.ineList.indexOf(ine);
    if (index > -1) {
      this.ineList.splice(index, 1);
    }
  }
}
