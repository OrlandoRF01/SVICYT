import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionTimerService } from '../session-timer.service';
import { Subscription } from 'rxjs';

interface InformacionGeneral {
  datosPersonales: string;
  lugarNacimiento: string;
  domicilioParticular: string;
  contacto: string;
  desarrollo: string;
  FormacionAcademica: string;
}

interface ProduccionCientifica {
  autorCoautorLibros: string;
  proyectosInvestigacion: string;
  patentes: string;
  articulosRevistaIndexada: string;
  articulosRevistaDivulgacionCientifica: string;
  implementacionTecnologica: string;
  gradosAcademicosPNPC: string;
  formaObtencionGrados: string;
  SNI: string;
  estancias: string;
}

interface Documentacion {
  credencialINE: string;
  documentoProbatorioAdscripcionInstitucional: string;
  documentoProbatorioParticipacionProyectos: string;
  documentoProbatorioProduccionCientifica: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  seccionActiva: string = 'informacionGeneral';
  nuevaInformacion: string = '';
  tiempoRestante: number = 30 * 60;
  private tiempoSubscription: Subscription | undefined;

  constructor(private sessionTimerService: SessionTimerService, private router: Router) { }

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

  informacionGeneral: InformacionGeneral = {
    datosPersonales: '',
    lugarNacimiento: '',
    domicilioParticular: '',
    contacto: '',
    desarrollo: '',
    FormacionAcademica: ''
  };

  produccionCientifica: ProduccionCientifica = {
    autorCoautorLibros: '',
    proyectosInvestigacion: '',
    patentes: '',
    articulosRevistaIndexada: '',
    articulosRevistaDivulgacionCientifica: '',
    implementacionTecnologica: '',
    gradosAcademicosPNPC: '',
    formaObtencionGrados: '',
    SNI: '',
    estancias: ''
  };

  documentacion: Documentacion = {
    credencialINE: '',
    documentoProbatorioAdscripcionInstitucional: '',
    documentoProbatorioParticipacionProyectos: '',
    documentoProbatorioProduccionCientifica: ''
  };

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  // Función para navegar a otro componente
  navegarAComponente(campo: string, seccion: 'informacionGeneral' | 'produccionCientifica' | 'documentacion') {
    switch (campo) {
      case 'contacto':
        this.router.navigate(['/contacto']);
        break;
      case 'datosPersonales':
        this.router.navigate(['/dpersonales']);
        break;
      case 'desarrollo':
        this.router.navigate(['/desarrollo']);
        break;
      case 'FormacionAcademica':
        this.router.navigate(['/FormacionAcademica']);
        break;  
      case 'domicilioParticular':
        this.router.navigate(['/domicilio']);
        break;
      case 'lugarNacimiento':
        this.router.navigate(['/fnacimiento']);
        break;
      case 'autorCoautorLibros':
        this.router.navigate(['/autoria']);
        break;
      case 'proyectosInvestigacion':
        this.router.navigate(['/proyectos']) 
        break;
      case 'patentes':
        this.router.navigate(['/patentes']); 
        break;
      case 'articulosRevistaIndexada':
        this.router.navigate(['/articulosRevistaIndexada']); 
        break;
      case 'articulosRevistaDivulgacionCientifica':
        this.router.navigate(['/articulosRevistaDivulgacionCientifica']); 
        break;
      case 'implementacionTecnologica':
        this.router.navigate(['/implementacionTecnologica']);  
        break;
      case 'gradosAcademicosPNPC':
        this.router.navigate(['/gradosAcademicosPNPC']);   
        break;
      case 'formaObtencionGrados':
        this.router.navigate(['/formaObtencionGrados']);    
        break;
      case 'SNI':
        this.router.navigate(['/sni']); 
        break;
      case 'estancias':
        this.router.navigate(['/estancias']);
        break;
      case 'credencialINE':
        this.router.navigate(['/credencialINE']);
        break;
      case 'documentoProbatorioAdscripcionInstitucional':
        this.router.navigate(['/documentoProbatorioAdscripcionInstitucional']);
        break;
      case 'documentoProbatorioParticipacionProyectos':
        this.router.navigate(['/documentoProbatorioParticipacionProyectos']);
        break;
      case 'documentoProbatorioProduccionCientifica':
        this.router.navigate(['/documentoProbatorioProduccionCientifica']);
        break;
      default:
        console.error('Campo no reconocido:', campo);
    }
  }
}
