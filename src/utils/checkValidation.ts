import { TValidateFunction } from "../utils/validation";

export type TCheckValidationFunc = (event: Event, validFunc: TValidateFunction) => void

export default function checkValidation(event: Event, validFunc: TValidateFunction) {
    const target = event?.target as HTMLInputElement;
    const test = validFunc(target.value)
    test ? target.classList.add('invalid') : target.classList.remove('invalid')
}