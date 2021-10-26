import './profile.scss'
import { TProps } from '../../enitities/Prop';
import Block from '../../classes/Block';
import profile from './profile.pug';
import Textfield from '../../components/textfield/textfield';

class ProfilePage extends Block {
    constructor(props: TProps) {
        super('profile-page', props)
    }
    render() {
        return profile({ ...this.props })
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

const inputLogin = new Textfield({
    name: 'Логин',
    type: 'email',
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

const inputEmail = new Textfield({
    name: 'Почта',
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

const inputDisplayName = new Textfield({
    name: 'Имя в чате',
    type: 'text',
    label: 'Имя в чате',
    placeholder: 'Имя в чате',
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
    name: 'Имя',
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
    name: 'Фамилия',
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
    name: 'Телефон',
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

const profilePage = new ProfilePage({
    inputLogin: inputLogin.render(),
    inputEmail: inputEmail.render(),
    inputDisplayName: inputDisplayName.render(),
    inputFirstName: inputFirstName.render(),
    inputSecondName: inputSecondName.render(),
    inputPhone: inputPhone.render(),
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
render(".app", profilePage);
