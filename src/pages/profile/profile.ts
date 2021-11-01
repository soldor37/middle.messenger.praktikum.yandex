import "./profile.scss";
import { TProps } from "../../enitities/Prop";
import Block from "../../classes/Block";
import profile from "./profile.pug";
import Textfield from "../../components/textfield/textfield";
import renderBlock from "../../utils/renderBlock";
import {
	validateLogin,
	checkValidation,
	validateEmail,
	validateName,
	validatePhone,
} from "../../utils/validation";

class ProfilePage extends Block {
	constructor(props: TProps, childComponents: Block[]) {
		super("profile-page", props, "profile-page", childComponents);
	}
	render() {
		return profile({ ...this.props });
	}
}

const inputLogin = new Textfield(
	{
		name: "Логин",
		type: "email",
		label: "Логин",
		placeholder: "Логин",
		validateFunc: validateLogin,
	},
	"inputLogin"
);

const inputEmail = new Textfield(
	{
		name: "Почта",
		type: "email",
		label: "Почта",
		placeholder: "Почта",
		validateFunc: validateEmail,
	},
	"inputEmail"
);

const inputDisplayName = new Textfield(
	{
		name: "Имя в чате",
		type: "text",
		label: "Имя в чате",
		placeholder: "Имя в чате",
		validateFunc: validateName,
	},
	"inputDisplayName"
);

const inputFirstName = new Textfield(
	{
		name: "Имя",
		type: "text",
		label: "Имя",
		placeholder: "Имя",
		validateFunc: validateName,
	},
	"inputFirstName"
);

const inputSecondName = new Textfield(
	{
		name: "Фамилия",
		type: "text",
		label: "Фамилия",
		placeholder: "Фамилия",
		validateFunc: validateName,
	},
	"inputSecondName"
);

const inputPhone = new Textfield(
	{
		name: "Телефон",
		type: "text",
		label: "Телефон",
		placeholder: "Телефон",
		validateFunc: validatePhone,
	},
	"inputPhone"
);

const profilePage = new ProfilePage(
	{
		events: {
			submit: (e: Event) => {
				e.preventDefault();
				const target = e.target as HTMLFormElement;
				const formData = new FormData(target);
				inputDisplayName.validate();
				inputEmail.validate();
				inputFirstName.validate();
				inputLogin.validate();
				inputPhone.validate();
				inputSecondName.validate();
				formData.forEach((value, key) => {
					console.log(`${key}: ${value}`);
				});
			},
		},
	},
	[
		inputDisplayName,
		inputEmail,
		inputFirstName,
		inputLogin,
		inputPhone,
		inputSecondName,
	]
);

// app — это class дива в корне DOM
renderBlock(".app", profilePage);
