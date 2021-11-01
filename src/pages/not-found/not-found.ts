import "./not-found.scss";
import { TProps } from "../../enitities/Prop";
import Block from "../../classes/Block";
import notFound from "./not-found.pug";
import renderBlock from "../../utils/renderBlock";
import closeImg from "../../assets/icons/close-octagon.svg";

class NotFoundPage extends Block {
	constructor(props: TProps) {
		super("notFound-page", props, "notFound-page");
	}
	render() {
		return notFound({ ...this.props });
	}
}

const notFoundPage = new NotFoundPage({
	closeImg: closeImg,
});

// app — это class дива в корне DOM
renderBlock(".app", notFoundPage);
