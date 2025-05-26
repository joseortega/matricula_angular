import { Nacionalidad } from "./nacionalidad";
import { UniformeTalla } from "./uniforme_talla";
import { Expediente } from "./expediente";

export class Estudiante {
    id: number | undefined;
    identificacion: string | undefined;
    apellidos: string | undefined;
    nombres: string |undefined;
    sexo: string | undefined;
    fecha_nacimiento: Date | string | null;
    direccion: string | undefined;
    telefono: string | undefined;
    correo: string | undefined;
    tiene_discapacidad: boolean | undefined;
    uniforme_talla: UniformeTalla | undefined | null;
    nacionalidad: Nacionalidad;
    expediente: Expediente | undefined;
    constructor(){
        this.nacionalidad = new Nacionalidad();
        this.fecha_nacimiento = null;
    }
    /**
     * Retorna el nombre completo del estudiante combinando identificación, nombres y apellidos
     * @returns string con el nombre completo formateado
     */
    get fullName(){
        return this.identificacion+' '+this.nombres+' '+this.apellidos;
    }
}
