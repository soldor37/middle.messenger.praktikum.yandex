import { TProps } from "../../enitities/Prop";
import Block from "../../classes/Block";
import registration from "./registration.pug";
import "./registration.scss";
import Textfield from "../../components/textfield/textfield";
import renderBlock from "../../utils/renderBlock";
import {
	validatePassword,
	validateLogin,
	validateEmail,
	validateName,
	validatePhone,
} from "../../utils/validation";
import Button from "../../components/button/button";

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
		validateFunc: validateLogin,
	},
	"inputLogin"
);

const inputPassword = new Textfield(
	{
		name: "password",
		type: "password",
		label: "Пароль",
		placeholder: "Пароль",
		validateFunc: validatePassword,
	},
	"inputPassword"
);

const inputEmail = new Textfield(
	{
		name: "email",
		type: "email",
		label: "Почта",
		placeholder: "Почта",
		validateFunc: validateEmail,
	},
	"inputEmail"
);

const inputFirstName = new Textfield(
	{
		name: "first_name",
		type: "text",
		label: "Имя",
		placeholder: "Имя",
		validateFunc: validateName,
	},
	"inputFirstName"
);

const inputSecondName = new Textfield(
	{
		name: "second_name",
		type: "text",
		label: "Фамилия",
		placeholder: "Фамилия",
		validateFunc: validateName,
	},
	"inputSecondName"
);

const inputPhone = new Textfield(
	{
		name: "phone",
		type: "text",
		label: "Телефон",
		placeholder: "Телефон",
		validateFunc: validatePhone,
	},
	"inputPhone"
);

const inputPasswordRepeat = new Textfield(
	{
		name: "repeat_password",
		type: "password",
		label: "Повторите пароль",
		placeholder: "Повторите пароль",
		validateFunc: validatePassword,
	},
	"inputPasswordRepeat"
);

const buttonSubmit = new Button({
	type: "submit",
	text: "Зарегистрироваться",
}, 'buttonSubmit');

const registrationPage = new RegistrationPage(
	{
		events: {
			submit: (e: Event) => {
				e.preventDefault();
				const target = e.target as HTMLFormElement;
				const formData = new FormData(target);
				inputEmail.validate()
				inputFirstName.validate()
				inputLogin.validate()
				inputPassword.validate()
				inputPasswordRepeat.validate()
				inputPhone.validate()
				inputSecondName.validate()
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
		buttonSubmit
	]
);

// app — это class дива в корне DOM
renderBlock(".app", registrationPage);
