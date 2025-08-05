import {Estudiante} from "./estudiante";
import {Requisito} from "./requisito";

export class Expediente{
  id: number | undefined;
  completo: boolean;
  retirado: boolean;
  fecha_ingreso: Date | undefined;
  fecha_retiro: Date | undefined;
  estudiante: Estudiante;
  requisitos: Requisito[]=[];
  observacion: string | undefined;

  constructor(){
    this.estudiante = new Estudiante();
    this.completo = false;
    this.retirado = false;
  }
}
