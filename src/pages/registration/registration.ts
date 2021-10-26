import { TProps } from '../../enitities/Prop';
import Block from '../../classes/Block';
import registration from './registration.pug';
import './registration.scss'
import Textfield from '../../components/textfield/textfield';

class RegistrationPage extends Block {
    constructor(props: TProps) {
        super('registration-page', props)
    }
    render() {
        return registration({ ...this.props })
    }
}
function render(query: string, block: RegistrationPage) {
    const root = document.querySelector(query);
    const content = block.getContent()
    if (content) {
        root?.appendChild(content);
    }
    return root;
}

const inputLogin = new Textfield({
    name: 'login',
    type: 'text',
    label: 'Логин',
    placeholder: 'Логин',
    events: {
        onfocus: (e: Event) => {
            console.log('focus')
        },
        onblur: (e: Event) => {
            console.log('blur')
        }
    },
})

const inputPassword = new Textfield({
    name: 'password',
    type: 'password',
    label: 'Пароль',
    placeholder: 'Пароль',
    events: {
        onfocus: (e: Event) => {
            console.log('focus')
        },
        onblur: (e: Event) => {
            console.log('blur')
        }
    },
})

const inputEmail = new Textfield({
    name: 'email',
    type: 'email',
    label: 'Почта',
    placeholder: 'Почта',
    events: {
        onfocus: (e: Event) => {
            console.log('focus')
        },
        onblur: (e: Event) => {
            console.log('blur')
        }
    },
})
const inputFirstName = new Textfield({
    name: 'first_name',
    type: 'text',
    label: 'Имя',
    placeholder: 'Имя',
    events: {
        onfocus: (e: Event) => {
            console.log('focus')
        },
        onblur: (e: Event) => {
            console.log('blur')
        }
    },
})
const inputSecondName = new Textfield({
    name: 'second_name',
    type: 'text',
    label: 'Фамилия',
    placeholder: 'Фамилия',
    events: {
        onfocus: (e: Event) => {
            console.log('focus')
        },
        onblur: (e: Event) => {
            console.log('blur')
        }
    },
})
const inputPhone = new Textfield({
    name: 'phone',
    type: 'text',
    label: 'Телефон',
    placeholder: 'Телефон',
    events: {
        onfocus: (e: Event) => {
            console.log('focus')
        },
        onblur: (e: Event) => {
            console.log('blur')
        }
    },
})
const inputPasswordRepeat = new Textfield({
    name: 'repeat_password',
    type: 'password',
    label: 'Повторите пароль',
    placeholder: 'Повторите пароль',
    events: {
        onfocus: (e: Event) => {
            console.log('focus')
        },
        onblur: (e: Event) => {
            console.log('blur')
        }
    },
})

const registrationPage = new RegistrationPage({
    inputLogin: inputLogin.render(),
    inputPassword: inputPassword.render(),
    inputEmail: inputEmail.render(),
    inputFirstName: inputFirstName.render(),
    inputSecondName: inputSecondName.render(),
    inputPhone: inputPhone.render(),
    inputPasswordRepeat: inputPasswordRepeat.render(),
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
render(".app", registrationPage);
