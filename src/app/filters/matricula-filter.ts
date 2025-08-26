import { GradoEscolar } from "app/models/grado-escolar";
import { PeriodoLectivo } from "app/models/periodo-lectivo";
import {Paralelo} from "../models/paralelo";
import {EstadoMatricula} from "../models/estadoMatricula";

export interface MatriculaFilter {
    periodo_lectivo: PeriodoLectivo | undefined | null;
    grado_escolar: GradoEscolar | undefined | null;
    paralelo: Paralelo | undefined | null;
    estado_matriculas: EstadoMatricula[] | undefined | null;
    search_term: string | undefined | null;
}
