import './profile.scss'
import { TProps } from '../../enitities/Prop';
import Block from '../../classes/Block';
import profile from './profile.pug';
import Textfield from '../../components/textfield/textfield';
import renderBlock from '../../utils/renderBlock';
import {  validateLogin, checkValidation, validateEmail, validateName, validatePhone } from '../../utils/validation';

class ProfilePage extends Block {
    constructor(props: TProps, childComponents: Block[]) {
        super('profile-page', props, 'profile-page', childComponents)
    }
    render() {
        return profile({ ...this.props })
    }
}


const inputLogin = new Textfield({
    name: 'Логин',
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

const inputEmail = new Textfield({
    name: 'Почта',
    type: 'email',
    label: 'Почта',
    placeholder: 'Почта',
    events: {
        focusin: (e: Event) => {
            checkValidation(e, validateEmail)
        },
        focusout: (e: Event) => {
            checkValidation(e, validateEmail)
        }
    },
}, 'inputEmail')

const inputDisplayName = new Textfield({
    name: 'Имя в чате',
    type: 'text',
    label: 'Имя в чате',
    placeholder: 'Имя в чате',
    events: {
        focusin: (e: Event) => {
            checkValidation(e, validateName)
        },
        focusout: (e: Event) => {
            checkValidation(e, validateName)
        }
    },
}, 'inputDisplayName')

const inputFirstName = new Textfield({
    name: 'Имя',
    type: 'text',
    label: 'Имя',
    placeholder: 'Имя',
    events: {
        focusin: (e: Event) => {
            checkValidation(e, validateName)
        },
        focusout: (e: Event) => {
            checkValidation(e, validateName)
        }
    },
}, 'inputFirstName')

const inputSecondName = new Textfield({
    name: 'Фамилия',
    type: 'text',
    label: 'Фамилия',
    placeholder: 'Фамилия',
    events: {
        focusin: (e: Event) => {
            checkValidation(e, validateName)
        },
        focusout: (e: Event) => {
            checkValidation(e, validateName)
        }
    },
}, 'inputSecondName')

const inputPhone = new Textfield({
    name: 'Телефон',
    type: 'text',
    label: 'Телефон',
    placeholder: 'Телефон',
    events: {
        focusin: (e: Event) => {
            checkValidation(e, validatePhone)
        },
        focusout: (e: Event) => {
            checkValidation(e, validatePhone)
        }
    },
}, 'inputPhone')

const profilePage = new ProfilePage({
    inputLogin: inputLogin,
    inputEmail: inputEmail,
    inputDisplayName: inputDisplayName,
    inputFirstName: inputFirstName,
    inputSecondName: inputSecondName,
    inputPhone: inputPhone,
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
}, [inputDisplayName, inputEmail, inputFirstName,
    inputLogin, inputPhone, inputSecondName]);

// app — это class дива в корне DOM
renderBlock(".app", profilePage);
