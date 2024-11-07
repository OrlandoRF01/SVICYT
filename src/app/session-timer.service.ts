import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionTimerService implements OnDestroy {
  private tiempoRestante: BehaviorSubject<number> = new BehaviorSubject<number>(30 * 60); // 30 minutos en segundos
  private intervalId: any;

  constructor(private router: Router) { }

  iniciarTemporizador(): Observable<number> {
    this.detenerTemporizador(); 

    this.intervalId = setInterval(() => {
      const nuevoTiempo = this.tiempoRestante.value - 1;
      this.tiempoRestante.next(nuevoTiempo);

      if (nuevoTiempo <= 0) {
        this.cerrarSesion();
      }
    }, 1000);

    return this.tiempoRestante.asObservable();
  }

  detenerTemporizador() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cerrarSesion() {
    this.detenerTemporizador();
   
    this.router.navigate(['/login']);
  }

  formatoTiempo(tiempo: number): string {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    this.detenerTemporizador();
  }
}