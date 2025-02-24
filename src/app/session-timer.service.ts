import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionTimerService implements OnDestroy {
  private readonly DURACION_SESION = 30 * 60; // 30 minutos en segundos
  private tiempoRestante = new BehaviorSubject<number>(this.DURACION_SESION);
  private intervalId: any = null;
  private tiempoSubscription: Subscription | null = null;

  constructor(private router: Router) { }

  iniciarTemporizador(): Observable<number> {
    this.detenerTemporizador();
    this.tiempoRestante.next(this.DURACION_SESION); // Reiniciar tiempo

    this.intervalId = setInterval(() => {
      const nuevoTiempo = Math.max(this.tiempoRestante.value - 1, 0);
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
      this.intervalId = null;
    }
  }

  reiniciarTemporizador() {
    this.tiempoRestante.next(this.DURACION_SESION);
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
    this.tiempoSubscription?.unsubscribe();
  }
}
