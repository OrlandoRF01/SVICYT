import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario.service';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [UsuarioService], 
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registroForm = this.fb.group(
      {
        nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        apellidoPaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        apellidoMaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        rfc: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{13}$/)]],
        correo: ['', [Validators.required, Validators.email]],
        confirmarCorreo: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(8)]],
        validacionContrasena: ['', Validators.required]
      },
      { validator: this.validacionesCombinadas }
    );
  }

  validacionesCombinadas(form: FormGroup) {
    const contrasena = form.get('contrasena')?.value;
    const validacionContrasena = form.get('validacionContrasena')?.value;
    const correo = form.get('correo')?.value;
    const confirmarCorreo = form.get('confirmarCorreo')?.value;

    const errores: any = {};

    if (contrasena !== validacionContrasena) {
      errores['mismatch'] = true;
    }
    if (correo !== confirmarCorreo) {
      errores['correoMismatch'] = true;
    }

    return Object.keys(errores).length ? errores : null;
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.usuarioService.registrarUsuario(this.registroForm.value)
        .subscribe({
          next: (response) => {
            console.log('Registro exitoso:', response);
            // Mostrar mensaje de éxito
            alert('Usuario registrado exitosamente');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error en el registro:', error);
            this.loading = false;
            this.errorMessage = 'Error al registrar usuario. Por favor, intente nuevamente.';
            if (error.error && error.error.message) {
              this.errorMessage = error.error.message;
            }
          },
          complete: () => {
            this.loading = false;
          }
        });
    } else {
      console.log('Formulario inválido');
      this.marcarFormularioTocado(this.registroForm);
    }
  }

  marcarFormularioTocado(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.registroForm.get(campo);
    return control?.invalid && control?.touched ? true : false;
  }


  irALogin() {
    this.router.navigate(['/login']);
  }
}
