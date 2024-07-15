import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTime', async: false })
export class IsTimeConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: any) {
    if (!/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(value)) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return `must be a valid time in HH:MM:SS format`;
  }
}
