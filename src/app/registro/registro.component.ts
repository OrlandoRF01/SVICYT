import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

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
      console.log('Registro exitoso:', this.registroForm.value);
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
