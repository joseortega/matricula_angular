import { Estudiante } from "./estudiante";
import { GradoEscolar } from "./grado-escolar";
import { Jornada } from "./jornada";
import { Modalidad } from "./modalidad";
import { Paralelo } from "./paralelo";
import { PeriodoLectivo } from "./periodo-lectivo";
import {MATRICULA_ESTADOS} from "./matricula-estados";
import {EstadoMatricula} from "./estadoMatricula";

export class Matricula {
   id: number | undefined;
   fecha_inscripcion: Date | string | null;
   fecha_legalizacion: Date | string | null;
   estudiante: Estudiante;
   modalidad: Modalidad;
   periodo_lectivo: PeriodoLectivo;
   grado_escolar: GradoEscolar;
   jornada: Jornada;
   paralelo: Paralelo;
   estado_matricula: EstadoMatricula;
   fecha_cambio_estado: Date | string | null;
   inscrito_sistema_publico: boolean;
   matricula_automatica:boolean;
   legalizada: boolean;
   promovida: boolean;
   observacion: string | undefined;

   public constructor() {
       this.fecha_inscripcion = null;
       this.fecha_legalizacion = null;
       this.estudiante = new Estudiante();
       this.modalidad = new Modalidad();
       this.periodo_lectivo = new PeriodoLectivo();
       this.grado_escolar = new GradoEscolar();
       this.jornada = new Jornada();
       this.paralelo = new Paralelo();
       this.estado_matricula = new EstadoMatricula();
       this.fecha_cambio_estado = new Date();
       this.inscrito_sistema_publico = false;
       this.matricula_automatica = false;
       this.legalizada = false;
       this.promovida = false;
    }
}
