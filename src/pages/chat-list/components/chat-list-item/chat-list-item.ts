import { TProps } from '../../../../enitities/Prop';
import Block from '../../../../classes/Block';
import compileChatListItem from './chat-list-item.pug';
import './chat-list-item.scss'

export type TChatListItemProps = TProps & {
    photoSrc?: string
    name: string
    lastMessage: string
    lastMessageTime: string
    messagesCount: number
}

export default class ChatListItem extends Block {
    constructor(props: TChatListItemProps, name: string) {
        super('div', props, name)
    }
    render() {
        return compileChatListItem({ ...this.props })
    }
}
