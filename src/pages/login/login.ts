import { TProps } from "../../enitities/Prop";
import Block from "../../classes/Block";
import login from "./login.pug";
import "./login.scss";
import Textfield from "../../components/textfield/textfield";
import renderBlock from "../../utils/renderBlock";
import { validatePassword, validateLogin } from "../../utils/validation";
import Button from "../../components/button/button";

class LoginPage extends Block {
	constructor(props: TProps, childComponents: Block[]) {
		super("login-page", props, "login-page", childComponents);
	}
	render() {
		return login({ ...this.props });
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

const buttonSubmit = new Button({
	type: "submit",
	text: "Войти",
}, 'buttonSubmit');

const loginPage = new LoginPage(
	{
		events: {
			submit: (e: Event) => {
				e.preventDefault();
				const target = e.target as HTMLFormElement;
				const formData = new FormData(target);
				inputLogin.validate();
				inputPassword.validate();
				formData.forEach((value, key) => {
					console.log(`${key}: ${value}`);
				});
			},
		},
	},
	[inputLogin, inputPassword, buttonSubmit]
);

// app — это class дива в корне DOM
renderBlock(".app", loginPage);
