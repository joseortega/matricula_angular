import { Estudiante } from "./estudiante";
import { Parentesco } from "./parentesco";
import { Representante } from "./representante";

export class EstudianteRepresentante {
    id: number | undefined;
    estudiante: Estudiante;
    representante: Representante;
    parentesco: Parentesco;
    es_principal: boolean | undefined;
    
    constructor(){
        this.estudiante = new Estudiante();
        this.representante = new Representante();
        this.parentesco = new Parentesco();
    }
}