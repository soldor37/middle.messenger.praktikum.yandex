import { TProps } from "../../enitities/Prop";
import Block from "../../classes/Block";
import compileTextfield from "./textfield.pug";
import "./textfield.scss";
import { TValidateFunction, checkValidation, checkValidationForEvent } from "../../utils/validation";

export type TTextfieldProps = TProps & {
	errorMsg?: string;
	label?: string;
	name: string;
	type?: string;
	placeholder: string;
	value?: string;
	validateFunc?: TValidateFunction;
};

export default class Textfield extends Block {
	constructor(props: TTextfieldProps, name: string) {
		props.events = {
			...props.events,
			focusin: (e: Event) => {
				checkValidationForEvent(e, this.props.validateFunc);
			},
			focusout: (e: Event) => {
				checkValidationForEvent(e, this.props.validateFunc);
			},
		};
		super("div", props, name);
	}
	render() {
		
		return compileTextfield({ ...this.props });
	}
	validate(): void {
		const target = this.getContent()?.getElementsByTagName("input")[0];
		if (target && this.props.validateFunc) {
			checkValidation(target, this.props.validateFunc);
		}
	}
}
