import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionTimerService } from '../../session-timer.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Documento {
  nombre: string;
  archivo: File;
}

@Component({
  selector: 'app-probatorio-produccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './probatorio-produccion.component.html',
  styleUrl: './probatorio-produccion.component.css'
})
export class ProbatorioProduccionComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;
  documentos: Documento[] = [];
  documentoForm: FormGroup;
  modalVisible = false;
  documentoValido = false;
  error: string | null = null;
  documentoSeleccionado: Documento | null = null;
  urlDocumento: SafeUrl | null = null;
  modalVisualizacionVisible = false;

  constructor(
    private fb: FormBuilder, 
    private sessionTimerService: SessionTimerService,
    private sanitizer: DomSanitizer
  ) {
    this.documentoForm = this.fb.group({});
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
    this.documentoValido = false;
    this.error = null;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.error = null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.documentoValido = true;
      this.error = null;
    } else {
      this.documentoValido = false;
      this.error = "El archivo debe ser un PDF válido.";
    }
  }

  guardarDocumento() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file && file.type === 'application/pdf') {
      const nuevoDocumento: Documento = { nombre: file.name, archivo: file };
      this.documentos.push(nuevoDocumento);
      this.cerrarModal();
    } else {
      this.error = "El archivo debe ser un PDF válido.";
    }
  }

  eliminarDocumento(documento: Documento) {
    const index = this.documentos.indexOf(documento);
    if (index > -1) {
      this.documentos.splice(index, 1);
    }
  }

  abrirDocumento(documento: Documento) {
    this.documentoSeleccionado = documento;
    const fileUrl = URL.createObjectURL(documento.archivo);
    this.urlDocumento = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
    this.modalVisualizacionVisible = true;
  }

  cerrarVisualizador() {
    this.modalVisualizacionVisible = false;
    this.documentoSeleccionado = null;
    if (this.urlDocumento) {
      URL.revokeObjectURL(this.urlDocumento as string);
    }
    this.urlDocumento = null;
  }
}
