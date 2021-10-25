import { TProps } from '../../enitities/Prop';
import Block from '../../classes/Block';
import compileTextfield from './textfield.pug';
import './textfield.scss'

export default class Textfield extends Block {
    constructor(props: TProps) {
        super('textfield', props)
    }
    render() {
        return compileTextfield({ ...this.props })
    }
}
// function render(query: string, block: Textfield) {
//     const root = document.querySelector(query);
//     const content = block.getContent()
//     if (content) {
//         root?.appendChild(content);
//     }
//     return root;
// }

// const textfield = new Textfield({
//     events: {
//         onfocus: (e: Event) => {
//             e.preventDefault();
//             console.log('focus')
//         },
//         onblur: (e: Event)=>{
//             e.preventDefault()
//             console.log('blur')
//         }
//     },
// });

// export default textfield
// app — это class дива в корне DOM
// render(".app", textfield);

  // Через секунду контент изменится сам, достаточно обновить пропсы
//   setTimeout(() => {
//     index.setProps({
//       text: 'Click me, please',
//     });
//   }, 1000);