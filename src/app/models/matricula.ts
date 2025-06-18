import { Estudiante } from "./estudiante";
import { GradoEscolar } from "./grado-escolar";
import { Jornada } from "./jornada";
import { Modalidad } from "./modalidad";
import { Paralelo } from "./paralelo";
import { PeriodoLectivo } from "./periodo-lectivo";
import {MATRICULA_ESTADOS} from "./matricula-estados";

export class Matricula {
   id: number | undefined;
   fecha: Date | string | null;
   estudiante: Estudiante;
   modalidad: Modalidad;
   periodo_lectivo: PeriodoLectivo;
   grado_escolar: GradoEscolar;
   jornada: Jornada;
   paralelo: Paralelo;
   estado: string | null;
   fecha_cambio_estado: Date | string | null;
   inscrito_en_sistema_publico: boolean;
   observacion: string | undefined;

   public constructor() {
       this.fecha = new Date();
       this.estudiante = new Estudiante();
       this.modalidad = new Modalidad();
       this.periodo_lectivo = new PeriodoLectivo();
       this.grado_escolar = new GradoEscolar();
       this.jornada = new Jornada();
       this.paralelo = new Paralelo();
       this.estado= MATRICULA_ESTADOS.PREINSCRIPCION;
       this.fecha_cambio_estado = new Date();
       this.inscrito_en_sistema_publico = true;
       this.estado = null;
    }
}
