import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NipValidator {
  static validateNip(formControl: AbstractControl): ValidationErrors | null {
    const nipWithoutDashes = formControl.value.replace(/-/g, '');
    const regEx = /^[0-9]{10}$/;
    if (regEx.test(nipWithoutDashes) === false) {
      return { validateNip: true };
    } else {
      const digits = ('' + nipWithoutDashes).split('');
      const checksum =
        (6 * parseInt(digits[0]) +
          5 * parseInt(digits[1]) +
          7 * parseInt(digits[2]) +
          2 * parseInt(digits[3]) +
          3 * parseInt(digits[4]) +
          4 * parseInt(digits[5]) +
          5 * parseInt(digits[6]) +
          6 * parseInt(digits[7]) +
          7 * parseInt(digits[8])) %
        11;
      const result =
        parseInt(digits[9]) === checksum ? null : { validateNip: true };
      return result;
    }
  }
}
