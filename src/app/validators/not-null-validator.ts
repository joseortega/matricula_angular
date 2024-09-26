import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notNullValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value?.id ? null : { required: true };
  };
}