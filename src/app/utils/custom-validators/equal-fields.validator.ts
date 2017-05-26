import { FormControl } from '@angular/forms';

const doesMatch = () => {
  return null;
}

const doesNotMatch = counterpartName => {
  return { counterpart: `Does not match ${counterpartName}` }
}

let counterpartControl: FormControl;

export const equalFieldsValidator = (counterpartName: string) => {
  return (control: FormControl) => {
    let { value, parent } = control;

    if(!parent) return null;

    if(!counterpartControl) {
      counterpartControl = parent.controls[counterpartName];
      counterpartControl.valueChanges.subscribe(() => control.updateValueAndValidity());
    }

    const doMatch = counterpartControl.value === value;

    return doMatch ? doesMatch() : doesNotMatch(counterpartName);
  }
}
