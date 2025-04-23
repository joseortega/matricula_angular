import { AbstractControl, ValidationErrors } from '@angular/forms';

export function atLeastOneSelectedValidator(control: AbstractControl): ValidationErrors | null {
  return control.value && control.value.length > 0 ? null : { required: true };
}
