import {Pais} from "./pais";
import {EstadoCivil} from "./estadoCivil";

export class Representante {
    id: number | undefined;
    identificacion: string | undefined;
    apellidos: string | undefined;
    nombres: string |undefined;
    sexo: string | undefined;
    fecha_nacimiento: Date | string | null | undefined;
    estado_civil: EstadoCivil | undefined | null;
    direccion: string | undefined;
    telefono: string | undefined;
    correo: string | undefined;
    pais_nacionalidad?: Pais;
    observacion: string | undefined;

    constructor(){
      this.pais_nacionalidad = new Pais();
      this.fecha_nacimiento = null;
    }
}
