export const MATRICULA_ESTADOS = {
  PREINSCRIPCION: 'PREINSCRIPCION',       // Proceso inicial, intención de matrícula
  PENDIENTE: 'PENDIENTE',                 // Falta cumplir algún requisito/documento/pago
  ACTIVA: 'ACTIVA',                       // Matrícula formalizada y vigente
  SUSPENDIDA: 'SUSPENDIDA',               // Pausa temporal (impago, sanción, etc.)
  RETIRADA: 'RETIRADA',                   // El estudiante se retiró voluntariamente (después de iniciar)
  ANULADA: 'ANULADA',                     // Matrícula anulada antes de iniciar actividades
  FINALIZADA: 'FINALIZADA',               // Matrícula completada (fin de ciclo)
  TRASLADADA: 'TRASLADADA',               // Matrícula transferida a otra carrera/sede
} as const;
