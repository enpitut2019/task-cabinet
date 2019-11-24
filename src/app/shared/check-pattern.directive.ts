import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appCheckPattern]',
  providers: [{provide: NG_VALIDATORS, useExisting: CheckPatternDirective, multi: true}]
})
export class CheckPatternDirective implements Validator {
  @Input('appCheckPattern') validationType: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    switch (this.validationType) {
      case 'user-name':
        return forbiddenNameValidator(new RegExp(/^(?!.*[\&\@\^\(\)\[\]\{\}\.\?\+\*\|\\\'\"\s]).*$/))(control);
      case 'email':
        return forbiddenNameValidator(new RegExp(/\S+@\S+\.\S+/))(control);
      case 'password':
        return forbiddenNameValidator(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/))(control);
    }
  }
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return !forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
