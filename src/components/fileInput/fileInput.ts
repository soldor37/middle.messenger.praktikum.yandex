import { TProps } from "../../enitities/Prop";
import Block from "../../classes/Block";
import compileFileInput from "./fileInput.pug";

export type TFileInputProps = TProps & {
	accept?: string;
	name?: string;
	id?: string;
};

export default class FileInput extends Block {
	constructor(props: TFileInputProps, name: string) {
		super("div", props, name);
	}
	render() {
		return compileFileInput({ ...this.props });
	}
}
