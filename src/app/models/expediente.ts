import {Estudiante} from "./estudiante";
import {Requisito} from "./requisito";

export class Expediente{
  id: number | undefined;
  esta_completo: boolean;
  esta_retirado: boolean;
  fecha_ingreso: Date | undefined;
  fecha_retiro: Date | undefined;
  estudiante: Estudiante;
  requisitos: Requisito[]=[];
  observacion: string | undefined;

  constructor(){
    this.estudiante = new Estudiante();
    this.esta_completo = false;
    this.esta_retirado = false;
  }
}
