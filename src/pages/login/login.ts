import { TProps } from '../../enitities/Prop';
import Block from '../../classes/Block';
import login from './login.pug';
import './login.scss'
import Textfield from '../../components/textfield/textfield';
import renderBlock from '../../utils/renderBlock';
import { validatePassword, validateLogin, checkValidation } from '../../utils/validation';

class LoginPage extends Block {
    constructor(props: TProps, childComponents: Block[]) {
        super('login-page', props, 'login-page', childComponents)
    }
    render() {
        return login({ ...this.props })
    }
}

const inputLogin = new Textfield({
    name: 'login',
    type: 'email',
    label: 'Логин',
    placeholder: 'Логин',
    events: {
        focusin: (e: Event) => {
            checkValidation(e, validateLogin)
        },
        focusout: (e: Event) => {
            checkValidation(e, validateLogin)
        }
    },
}, 'inputLogin')

const inputPassword = new Textfield({
    name: 'password',
    type: 'password',
    label: 'Пароль',
    placeholder: 'Пароль',
    events: {
        focusin: (e: Event) => {
            checkValidation(e, validatePassword)
        },
        focusout: (e: Event) => {
            checkValidation(e, validatePassword)
        },
    },
}, 'inputPassword')

const loginPage = new LoginPage({
    events: {
        submit: (e: Event) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const formData = new FormData(target);
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
        },
    },
}, [inputLogin, inputPassword]);

// app — это class дива в корне DOM
renderBlock(".app", loginPage);
