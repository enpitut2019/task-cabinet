import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[checkPattern]',
  providers: [{provide: NG_VALIDATORS, useExisting: CheckPatternDirective, multi: true}]
})
export class CheckPatternDirective implements Validator {
  @Input('checkPattern') validationType: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    switch (this.validationType) {
      case 'user-name':
        return forbiddenNameValidator(new RegExp(/^(?!.*[\&\@\^\(\)\[\]\{\}\.\?\+\*\|\\\'\"\s]).*$/, 'i'))(control);
      case 'email':
        return forbiddenNameValidator(new RegExp(/\S+@\S+\.\S+/, 'i'))(control);
    }
  }
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return !forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
