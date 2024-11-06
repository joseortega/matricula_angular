import { Nacionalidad } from "./nacionalidad";
import { UniformeTalla } from "./uniforme_talla";
import {Expediente} from "./expediente";

export class Estudiante {
    id: number | undefined;
    identificacion: string | undefined;
    apellidos: string | undefined;
    nombres: string |undefined;
    sexo: string | undefined;
    fecha_nacimiento: Date | string | null;
    lugar_residencia: string | undefined;
    correo: string | undefined;
    telefono: string | undefined;
    tiene_discapacidad: boolean | undefined;
    uniforme_talla: UniformeTalla | undefined | null;
    nacionalidad: Nacionalidad;
    expediente: Expediente | undefined;
    constructor(){
        this.nacionalidad = new Nacionalidad();
        this.uniforme_talla = new UniformeTalla();
        this.fecha_nacimiento = new Date();
    }
    public fullName(){
        return this.identificacion+' '+this.nombres+' '+this.apellidos;
    }
}
