import './error.scss'
import { TProps } from '../../enitities/Prop';
import Block from '../../classes/Block';
import error from './error.pug';
import renderBlock from '../../utils/renderBlock';
import closeImg from '../../assets/icons/close-octagon.svg'

class ProfilePage extends Block {
    constructor(props: TProps) {
        super('error-page', props, 'error-page')
    }
    render() {
        return error({ ...this.props })
    }
}


const errorPage = new ProfilePage({
    closeImg: closeImg
});

// app — это class дива в корне DOM
renderBlock(".app", errorPage);
