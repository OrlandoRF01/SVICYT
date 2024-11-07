import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContactoComponent } from './informacion-general/contacto/contacto.component';
import { DpersonalesComponent } from './informacion-general/dpersonales/dpersonales.component';
import { FnacimientoComponent } from './informacion-general/fnacimiento/fnacimiento.component';
import { DomicilioComponent } from './informacion-general/domicilio/domicilio.component';
import { DesarrolloComponent } from './informacion-general/desarrollo/desarrollo.component';
import { AutoriaComponent } from './produccion-cientifica/autoria/autoria.component';
import { ProyectosComponent } from './produccion-cientifica/proyectos/proyectos.component';
import { PatentesComponent } from './produccion-cientifica/patentes/patentes.component';
import { SniComponent } from './produccion-cientifica/sni/sni.component';
import { RevistaIndexadaComponent } from './produccion-cientifica/revista-indexada/revista-indexada.component';
import { RevistaCientificaComponent } from './produccion-cientifica/revista-cientifica/revista-cientifica.component';
import { EstanciasComponent } from './produccion-cientifica/estancias/estancias.component';
import { ImplementacionComponent } from './produccion-cientifica/implementacion/implementacion.component';
import { PnpcComponent } from './produccion-cientifica/pnpc/pnpc.component';
import { ObtencionGradosComponent } from './produccion-cientifica/obtencion-grados/obtencion-grados.component';
import { FormacionComponent } from './informacion-general/formacion/formacion.component';
import { RegistroComponent } from './registro/registro.component';
import { IneComponent } from './documentacion/ine/ine.component';
import { InscripcionInstitucionalComponent } from './documentacion/inscripcion-institucional/inscripcion-institucional.component';
import { ParticipacionProyectosComponent } from './documentacion/participacion-proyectos/participacion-proyectos.component';
import { ProbatorioProduccionComponent } from './documentacion/probatorio-produccion/probatorio-produccion.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'dpersonales', component: DpersonalesComponent },
    { path: 'fnacimiento', component: FnacimientoComponent },
    { path: 'domicilio', component: DomicilioComponent },
    { path: 'desarrollo', component:DesarrolloComponent },
    {path: 'autoria', component: AutoriaComponent },
    { path: 'proyectos', component: ProyectosComponent },
    { path: 'patentes', component: PatentesComponent},
    { path:'sni', component: SniComponent},
    { path:'articulosRevistaIndexada', component: RevistaIndexadaComponent},
    { path: 'articulosRevistaDivulgacionCientifica', component: RevistaCientificaComponent },
    {path: 'estancias', component: EstanciasComponent},
    { path:'implementacionTecnologica', component: ImplementacionComponent},
    { path: 'gradosAcademicosPNPC', component:PnpcComponent},
    { path: 'formaObtencionGrados', component: ObtencionGradosComponent},
    { path:'FormacionAcademica', component: FormacionComponent},
    { path:'credencialINE', component: IneComponent},
    { path: 'documentoProbatorioAdscripcionInstitucional', component: InscripcionInstitucionalComponent },
    { path: 'documentoProbatorioParticipacionProyectos', component: ParticipacionProyectosComponent }, 
    { path: 'documentoProbatorioProduccionCientifica', component: ProbatorioProduccionComponent },

];
