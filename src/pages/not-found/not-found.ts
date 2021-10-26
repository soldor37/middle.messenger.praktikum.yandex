import './not-found.scss'
import { TProps } from '../../enitities/Prop';
import Block from '../../classes/Block';
import notFound from './not-found.pug';

class NotFoundPage extends Block {
    constructor(props: TProps) {
        super('notFound-page', props)
    }
    render() {
        return notFound({ ...this.props })
    }
}
function render(query: string, block: NotFoundPage) {
    const root = document.querySelector(query);
    const content = block.getContent()
    if (content) {
        root?.appendChild(content);
    }
    return root;
}

const notFoundPage = new NotFoundPage({});

// app — это class дива в корне DOM
render(".app", notFoundPage);
