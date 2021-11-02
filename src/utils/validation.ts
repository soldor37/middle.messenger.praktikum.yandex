export enum ERROR_MESSAGE {
	EMAIL = "Некорректный email",
	PHONE = "Некорректный номер телефона",
	LOGIN = `Некорректный login`,
	PASSWORD = "От 8 до 40 символов. Хотя бы 1 заглавная буква, 1 цифра",
	PASSWORD_CONFIRM = "Пароли не совпадают",
	NAME = 'Некорретные символы'
}
export type TValidateFunction = (value: string) => string;

export const validatePassword = (value: string) => {
	const pattern = /^(?=.*[A-ZА-Я])(?=.*\d).{8,40}$/g;
	const result = value.match(pattern);
	return result ? "" : ERROR_MESSAGE.PASSWORD;
};

export const validateLogin = (value: string) => {
	const pattern = /^(?=.*[a-zA-Z_-])[a-zA-Z0-9-_]{3,20}$/g;
	const result = value.match(pattern);
	return result ? "" : ERROR_MESSAGE.LOGIN;
};

export const validateEmail = (value: string) => {
	const pattern =
		/^(?=.*[0-9a-zA-Z_@-])[0-9a-zA-Z_@-]+@[a-zA-Z_-]+\.[a-zA-Z_-]+$/g;
	const result = value.match(pattern);
	return result ? "" : ERROR_MESSAGE.EMAIL;
};

export const validatePhone = (value: string) => {
	const pattern = /^[\d/+]\d{9,14}$/g;
	const result = value.match(pattern);
	return result ? "" : ERROR_MESSAGE.PHONE;
};

export const validateName = (value: string) => {
	const pattern = /^[А-ЯA-Z][а-яёЁa-z]+$/g;
	const result = value.match(pattern);
	return result ? "" : ERROR_MESSAGE.NAME;
};

export type TCheckValidationFunc = (
	event: Event,
	validFunc: TValidateFunction
) => void;

export function checkValidationForEvent(
	event: Event,
	validateFunc: TValidateFunction
) {
	const target = event?.target as HTMLInputElement;
	if (target) {
		checkValidation(target, validateFunc);
	}
}

export function checkValidation(
	target: HTMLInputElement,
	validFunc: TValidateFunction
) {
	const test = validFunc(target.value);
	test ? target.classList.add("invalid") : target.classList.remove("invalid");
	const errorMsgTarget = target.nextSibling;
	if (errorMsgTarget) {
		errorMsgTarget.textContent = test;
	}
}
