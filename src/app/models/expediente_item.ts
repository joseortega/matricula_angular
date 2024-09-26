import {Expediente} from "./expediente";
import {Requisito} from "./requisito";

export class Expediente_item{
  id: number | undefined;
  expediente: Expediente;
  requisito: Requisito;

  constructor() {
    this.expediente = new Expediente();
    this.requisito = new Requisito();
  }

}
