export enum ERROR_MESSAGE {
    EMAIL = 'Некорректный email',
    PHONE = 'Некорректный номер телефона',
    LOGIN = `От 3 до 20 символов, латиница, может содержать цифры,
    но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`,
    PASSWORD = 'От 8 до 40 символов. Хотя бы 1 заглавная буква, 1 цифра',
    PASSWORD_CONFIRM = 'Пароли не совпадают',
}
export type TValidateFunction = (value: string) => string

export const validatePassword = (value: string) => {
    const pattern = /^(?=.*[A-ZА-Я])(?=.*\d).{8,40}$/g;
    const result = value.match(pattern);
    return result ? '' : ERROR_MESSAGE.PASSWORD;
};

export const validateLogin = (value: string) => {
    const pattern = /^(?=.*[a-zA-Z_-])[a-zA-Z0-9-_]{3,20}$/g;
    const result = value.match(pattern);
    return result ? '' : ERROR_MESSAGE.PASSWORD;
};

export const validateEmail = (value: string) => {
    const pattern = /^(?=.*[a-zA-Z_@-])[a-zA-Z_@-]+@[a-zA-Z_-]+\.[a-zA-Z_-]+$/g;
    const result = value.match(pattern);
    return result ? '' : ERROR_MESSAGE.EMAIL;
};

export const validatePhone = (value: string) => {
    const pattern = /^[\d/+]\d{9,14}$/g;
    const result = value.match(pattern);
    return result ? '' : ERROR_MESSAGE.PHONE;
};

export const validateName = (value: string) => {
    const pattern = /^[А-ЯA-Z][а-яёЁa-z]+$/g;
    const result = value.match(pattern);
    return result ? '' : ERROR_MESSAGE.PHONE;
};

export type TCheckValidationFunc = (event: Event, validFunc: TValidateFunction) => void

export function checkValidation(event: Event, validFunc: TValidateFunction) {
    const target = event?.target as HTMLInputElement;
    const test = validFunc(target.value)
    test ? target.classList.add('invalid') : target.classList.remove('invalid')
}