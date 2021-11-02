import { TProps } from "../../enitities/Prop";
import Block from "../../classes/Block";
import chatList from "./chat-list.pug";
import "./chat-list.scss";
import Textfield from "../../components/textfield/textfield";
import renderBlock from "../../utils/renderBlock";
import ChatListItem from "./components/chat-list-item/chat-list-item";
import ChatListMessage from "./components/chat-list-message/chat-list-message";

class ChatList extends Block {
	constructor(props: TProps, childComponents: Block[]) {
		super("chatList-page", props, "chatList-page", childComponents);
	}
	render() {
		return chatList({ ...this.props });
	}
}

const inputMessage = new Textfield(
	{
		name: "message",
		type: "text",
		label: "",
		placeholder: "Введите сообщение",
		validateFunc: (v) => (!!v ? "" : "Введите сообщение"),
	},
	"inputMessage"
);

const inputSearch = new Textfield(
	{
		name: "search",
		type: "text",
		label: "",
		placeholder: "Поиск",
		validateFunc: (v) => (!!v ? "" : "Введите имя"),
	},
	"inputSearch"
);

const chatListItems = [
	new ChatListItem(
		{
			name: "Георгий",
			lastMessage: "Привет, как дела",
			lastMessageTime: "10:30",
			messagesCount: 3,
		},
		"chatListItem"
	).render(),
	new ChatListItem(
		{
			name: "Иван",
			lastMessage: "Бла бла бла",
			lastMessageTime: "20:45",
			messagesCount: 21,
		},
		"chatListItem"
	).render(),
];

const chatListMessages = [
	new ChatListMessage(
		{
			message: "Какой-то текст фывфывфыв",
			time: "10:30",
			status: "viewed",
			senderType: "sender",
		},
		"chatListMessage"
	).render(),

	new ChatListMessage(
		{
			message:
				"ФДЫвфылдвофывдфывфы ФЫвфывфы вфыв фывфы вфы вфывфыв фывфы вфы вфы вфыв фывфывфывфывфывфывфывфыв фы вфыв фыв фыв фыв фы",
			time: "10:30",
			status: "viewed",
			senderType: "receiver",
		},
		"chatListMessage"
	).render(),
];

const chatListPage = new ChatList(
	{
		dialogs: chatListItems,
		messages: chatListMessages,
	},
	[inputMessage, inputSearch]
);

// app — это class дива в корне DOM
renderBlock(".app", chatListPage);
