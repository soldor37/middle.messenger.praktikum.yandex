import './change-password.scss'
import { TProps } from '../../enitities/Prop';
import Block from '../../classes/Block';
import changePassword from './change-password.pug';
import Textfield from '../../components/textfield/textfield';

class ChangePasswordPage extends Block {
    constructor(props: TProps) {
        super('changePassword-page', props)
    }
    render() {
        return changePassword({ ...this.props })
    }
}
function render(query: string, block: ChangePasswordPage) {
    const root = document.querySelector(query);
    const content = block.getContent()
    if (content) {
        root?.appendChild(content);
    }
    return root;
}

const inputOldPassword = new Textfield({
    name: 'oldPassword',
    type: 'password',
    label: 'Старый пароль',
    placeholder: 'Старый пароль',
    events: {
        onfocus: (e: Event) => {
            console.log('focus')
        },
        onblur: (e: Event) => {
            console.log('blur')
        }
    },
})

const inputNewPassword = new Textfield({
    name: 'newPassword',
    type: 'password',
    label: 'Новый пароль',
    placeholder: 'Новый пароль',
    events: {
        onfocus: (e: Event) => {
            console.log('focus')
        },
        onblur: (e: Event) => {
            console.log('blur')
        }
    },
})

const inputNewPasswordRepeat = new Textfield({
    name: 'newPassword_repeat',
    type: 'password',
    label: 'Повторите новйы пароль',
    placeholder: 'Повторите новйы пароль',
    events: {
        onfocus: (e: Event) => {
            console.log('focus')
        },
        onblur: (e: Event) => {
            console.log('blur')
        }
    },
})

const changePasswordPage = new ChangePasswordPage({
    inputOldPassword: inputOldPassword.render(),
    inputNewPassword: inputNewPassword.render(),
    inputNewPasswordRepeat: inputNewPasswordRepeat.render(),
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
});

// app — это class дива в корне DOM
render(".app", changePasswordPage);
