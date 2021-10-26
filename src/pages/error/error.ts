import './error.scss'
import { TProps } from '../../enitities/Prop';
import Block from '../../classes/Block';
import error from './error.pug';

class ProfilePage extends Block {
    constructor(props: TProps) {
        super('error-page', props)
    }
    render() {
        return error({ ...this.props })
    }
}
function render(query: string, block: ProfilePage) {
    const root = document.querySelector(query);
    const content = block.getContent()
    if (content) {
        root?.appendChild(content);
    }
    return root;
}

const errorPage = new ProfilePage({});

// app — это class дива в корне DOM
render(".app", errorPage);
