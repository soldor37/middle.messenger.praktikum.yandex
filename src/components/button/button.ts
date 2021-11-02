import { TProps } from "../../enitities/Prop";
import Block from "../../classes/Block";
import compileButton from "./button.pug";
import "./button.scss";

export type TButtonProps = TProps & {
	type?: string;
	text?: string;
};

export default class Button extends Block {
	constructor(props: TButtonProps, name: string) {
		super("div", props, name);
	}
	render() {	
		return compileButton({ ...this.props });
	}
}
