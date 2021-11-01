import "./change-password.scss";
import { TProps } from "../../enitities/Prop";
import Block from "../../classes/Block";
import changePassword from "./change-password.pug";
import Textfield from "../../components/textfield/textfield";
import renderBlock from "../../utils/renderBlock";
import { validatePassword, checkValidation } from "../../utils/validation";

class ChangePasswordPage extends Block {
	constructor(props: TProps, childComponents: Block[]) {
		super(
			"changePassword-page",
			props,
			"changePassword-page",
			childComponents
		);
	}
	render() {
		return changePassword({ ...this.props });
	}
}

const inputOldPassword = new Textfield(
	{
		name: "oldPassword",
		type: "password",
		label: "Старый пароль",
		placeholder: "Старый пароль",
		validateFunc: validatePassword,
	},
	"inputOldPassword"
);

const inputNewPassword = new Textfield(
	{
		name: "newPassword",
		type: "password",
		label: "Новый пароль",
		placeholder: "Новый пароль",
		validateFunc: validatePassword,
	},
	"inputNewPassword"
);

const inputNewPasswordRepeat = new Textfield(
	{
		name: "newPassword_repeat",
		type: "password",
		label: "Повторите новйы пароль",
		placeholder: "Повторите новйы пароль",
		validateFunc: validatePassword,
	},
	"inputNewPasswordRepeat"
);

const changePasswordPage = new ChangePasswordPage(
	{
		events: {
			submit: (e: Event) => {
				e.preventDefault();
				const target = e.target as HTMLFormElement;
				const formData = new FormData(target);
				inputNewPassword.validate()
				inputNewPasswordRepeat.validate()
				inputOldPassword.validate()
				formData.forEach((value, key) => {
					console.log(`${key}: ${value}`);
				});
			},
		},
	},
	[inputNewPassword, inputNewPasswordRepeat, inputOldPassword]
);

// app — это class дива в корне DOM
renderBlock(".app", changePasswordPage);
