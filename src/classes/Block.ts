import { TEvents } from '../enitities/Event';
import { TProps } from '../enitities/Prop';
import EventBus from './EventBus'
import { v4 as makeUUID } from 'uuid'

export default class Block {
	private _meta: null | { tagName: string; props: TProps; childComponents?: Block[] } = null

	private _element: null | HTMLElement = null;

	private _id: string = '';

	public name: string = '';

	props: TProps = {}

	childComponents: Block[] | undefined = []

	eventBus: EventBus

	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	};


	constructor(tagName: string = "div", props: TProps = {}, name: string, childComponents?: Block[]) {

		const eventBus = new EventBus();

		this._meta = {
			tagName,
			props,
			childComponents
		};
		this._id = makeUUID();

		this.name = name

		this.childComponents = childComponents


		this.props = this._makePropsProxy({ ...props, __id: this._id });

		this.eventBus = eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);

	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources() {
		const tagName = this._meta?.tagName;
		if (tagName) {
			this._element = this._createDocumentElement(tagName);
		}
	}

	init() {
		this._createResources();
		this.eventBus.emit(Block.EVENTS.FLOW_CDM)
	}

	private _componentDidMount() {
		this.componentDidMount();
		this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount() { }

	private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: TProps, newProps: TProps) {
		if (oldProps === newProps) return false;
		return true;
	}

	setProps = (nextProps: TProps) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	private _renderBlockWithComponents(block: string) {
		const fragment = document.createElement('template');
		fragment.innerHTML = block;
		if (this.childComponents) {
			Object.values(this.childComponents)
				.forEach((block: Block) => {
					const el = fragment.content.querySelector(`[data-component="${block.name}"]`);
					
					if (el && block.element) {
						el.replaceWith(block.element);
					}
				});
		}
		return fragment.content;
	}

	private _render() {
		const block = this.render();

		this._removeEvents()

		if (this._element && block) {
			// this._element.innerHTML = block
			const blockWithComponents: DocumentFragment = this._renderBlockWithComponents(block)
			this._element.innerHTML = '';
			this._element.appendChild(blockWithComponents)
		}

		this._addEvents();
	}

	// Может переопределять пользователь, необязательно трогать
	render(): string | void { }

	getContent() {
		return this.element;
	}

	private _addEvents() {
		const { events = {} } = this.props;
		
		Object.keys(events).forEach(eventName => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	private _removeEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			this._element?.removeEventListener(eventName, events[eventName]);
		});
	}
	private _makePropsProxy(props: TProps) {

		const proxyProps = new Proxy(props, {
			get: (target, prop: string) => {
				const value = target[prop]
				return typeof value === "function" ? value.bind(target) : value
			},
			set: (target, prop: string, value) => {
				const oldProps = target[prop]
				target[prop] = value
				this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, value);
				return true
			},
			deleteProperty: (target, prop: string) => {
				console.log('trying to delete property:', target, prop)
				throw new Error('нет доступа');
			}
		})
		return proxyProps
	}

	private _createDocumentElement(tagName: string) {
		const element = document.createElement(tagName);
		element.setAttribute('data-id', this._id);
		return element
	}

	show() {
		if (this.getContent() !== null) {
			this.getContent()!.style.display = "block";
		}

	}

	hide() {
		if (this.getContent() !== null) {
			this.getContent()!.style.display = "none";
		}
	}
}