import { TProps } from '../../../../enitities/Prop';
import Block from '../../../../classes/Block';
import compileChatListMessage from './chat-list-message.pug';
import './chat-list-message.scss'

export type TChatListMessageProps = TProps & {
    message: string
    time: string
    status: 'viewed' | 'received' | 'not-received',
    senderType: 'sender' | 'receiver'
}

export default class ChatListMessage extends Block {
    constructor(props: TChatListMessageProps, name: string) {
        super('div', props, name)
    }
    render() {
        return compileChatListMessage({ ...this.props })
    }
}
