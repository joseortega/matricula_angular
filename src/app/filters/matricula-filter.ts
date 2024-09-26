import { GradoEscolar } from "app/models/grado-escolar";
import { PeriodoLectivo } from "app/models/periodo-lectivo";

export interface MatriculaFilter {
    periodo_lectivo: PeriodoLectivo | undefined | null;
    grado_escolar: GradoEscolar | undefined | null;
    search_term: string | undefined | null;
}
