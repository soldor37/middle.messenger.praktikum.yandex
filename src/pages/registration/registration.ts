import { TProps } from "../../enitities/Prop";
import Block from "../../classes/Block";
import registration from "./registration.pug";
import "./registration.scss";
import Textfield from "../../components/textfield/textfield";
import renderBlock from "../../utils/renderBlock";
import {
	validatePassword,
	validateLogin,
	checkValidation,
	validateEmail,
	validateName,
	validatePhone,
} from "../../utils/validation";

class RegistrationPage extends Block {
	constructor(props: TProps, childComponents: Block[]) {
		super("registration-page", props, "registration-page", childComponents);
	}
	render() {
		return registration({ ...this.props });
	}
}

const inputLogin = new Textfield(
	{
		name: "login",
		type: "email",
		label: "Логин",
		placeholder: "Логин",
		events: {
			focusin: (e: Event) => {
				checkValidation(e, validateLogin);
			},
			focusout: (e: Event) => {
				checkValidation(e, validateLogin);
			},
		},
	},
	"inputLogin"
);

const inputPassword = new Textfield(
	{
		name: "password",
		type: "password",
		label: "Пароль",
		placeholder: "Пароль",
		events: {
			focusin: (e: Event) => {
				checkValidation(e, validatePassword);
			},
			focusout: (e: Event) => {
				checkValidation(e, validatePassword);
			},
		},
	},
	"inputPassword"
);

const inputEmail = new Textfield(
	{
		name: "email",
		type: "email",
		label: "Почта",
		placeholder: "Почта",
		events: {
			focusin: (e: Event) => {
				checkValidation(e, validateEmail);
			},
			focusout: (e: Event) => {
				checkValidation(e, validateEmail);
			},
		},
	},
	"inputEmail"
);

const inputFirstName = new Textfield(
	{
		name: "first_name",
		type: "text",
		label: "Имя",
		placeholder: "Имя",
		events: {
			focusin: (e: Event) => {
				checkValidation(e, validateName);
			},
			focusout: (e: Event) => {
				checkValidation(e, validateName);
			},
		},
	},
	"inputFirstName"
);

const inputSecondName = new Textfield(
	{
		name: "second_name",
		type: "text",
		label: "Фамилия",
		placeholder: "Фамилия",
		events: {
			focusin: (e: Event) => {
				checkValidation(e, validateName);
			},
			focusout: (e: Event) => {
				checkValidation(e, validateName);
			},
		},
	},
	"inputSecondName"
);

const inputPhone = new Textfield(
	{
		name: "phone",
		type: "text",
		label: "Телефон",
		placeholder: "Телефон",
		events: {
			focusin: (e: Event) => {
				checkValidation(e, validatePhone);
			},
			focusout: (e: Event) => {
				checkValidation(e, validatePhone);
			},
		},
	},
	"inputPhone"
);

const inputPasswordRepeat = new Textfield(
	{
		name: "repeat_password",
		type: "password",
		label: "Повторите пароль",
		placeholder: "Повторите пароль",
		events: {
			focusin: (e: Event) => {
				checkValidation(e, validatePassword);
			},
			focusout: (e: Event) => {
				checkValidation(e, validatePassword);
			},
		},
	},
	"inputPasswordRepeat"
);

const registrationPage = new RegistrationPage(
	{
		inputLogin: inputLogin,
		inputPassword: inputPassword,
		inputEmail: inputEmail,
		inputFirstName: inputFirstName,
		inputSecondName: inputSecondName,
		inputPhone: inputPhone,
		inputPasswordRepeat: inputPasswordRepeat,
		events: {
			submit: (e: Event) => {
				e.preventDefault();
				const target = e.target as HTMLFormElement;
				const formData = new FormData(target);
				formData.forEach((value, key) => {
					console.log(`${key}: ${value}`);
				});
			},
		},
	},
	[
		inputLogin,
		inputPassword,
		inputEmail,
		inputFirstName,
		inputPasswordRepeat,
		inputPhone,
		inputSecondName,
	]
);

// app — это class дива в корне DOM
renderBlock(".app", registrationPage);
