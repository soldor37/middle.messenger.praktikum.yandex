import { TProps } from '../../enitities/Prop';
import Block from '../../classes/Block';
import login from './login.pug';
import './login.scss'
import Textfield from '../../components/textfield/textfield';

class LoginPage extends Block {
    constructor(props: TProps) {
        super('login-page', props)
    }
    render() {
        return login({ ...this.props })
    }
}
function render(query: string, block: LoginPage) {
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
}).render()

const inputPassword = new Textfield({
    name: 'Пароль',
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
}).render()

const loginPage = new LoginPage({
    inputLogin: inputLogin,
    inputPassword: inputPassword,
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
render(".app", loginPage);

  // Через секунду контент изменится сам, достаточно обновить пропсы
//   setTimeout(() => {
//     index.setProps({
//       text: 'Click me, please',
//     });
//   }, 1000);