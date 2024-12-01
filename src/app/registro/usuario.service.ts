import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Usuario {
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    rfc: string;
    contrasena: string;
    codigo?: string;
    fecha_creado?: Date;
    fecha_modificado?: Date;
    usu_activo_sys?: boolean;
    usu_activo_convocatoria?: boolean;
    id_rol_usuario_fk?: number;
    id_grado_fk?: number;
    id_programa_fk?: number;
    id_institucion_fk?: number;
    anio_grado?: number;
    candidato_validado?: boolean;
}

@Injectable()
export class UsuarioService {
    private apiUrl = 'https://svicyt-itsm.onrender.com/api/usuarios';

    constructor(private http: HttpClient) { }

    registrarUsuario(datosUsuario: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        const usuario: Usuario = {
            nombre: datosUsuario.nombres,
            primer_apellido: datosUsuario.apellidoPaterno,
            segundo_apellido: datosUsuario.apellidoMaterno,
            rfc: datosUsuario.rfc,
            contrasena: datosUsuario.contrasena,
            usu_activo_sys: true,
            usu_activo_convocatoria: false,
            candidato_validado: false
        };

        return this.http.post<any>(this.apiUrl, usuario, { headers: headers });
    }
}