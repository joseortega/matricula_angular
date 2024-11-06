import {Estudiante} from "./estudiante";
import {Requisito} from "./requisito";

export class Expediente{
  id: number | undefined;
  observacion: string | undefined;
  estudiante: Estudiante;
  requisitos: Requisito[]=[];

  constructor(){
    this.estudiante = new Estudiante();
  }
}
