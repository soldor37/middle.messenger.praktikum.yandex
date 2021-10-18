import EventBus from './EventBus.js'

type TProps = { [k: string]: any }

export default class Block {
	_meta: null | { tagName: string; props: TProps } = null
	props: TProps = {}
	eventBus: () => EventBus

	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	};

	_element: null | HTMLElement = null;

	constructor(tagName = "div", props = {}) {

		const eventBus = new EventBus();

		this._meta = {
			tagName,
			props
		};

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		const tagName = this._meta?.tagName;
		if (tagName) {
			this._element = this._createDocumentElement(tagName);
		}
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM)
	}

	_componentDidMount() {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount() { }

	_componentDidUpdate(oldProps: TProps, newProps: TProps) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
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

	_render() {
		const block = this.render();
		// Этот небезопасный метод для упрощения логики
		// Используйте шаблонизатор из npm или напишите свой безопасный
		// Нужно не в строку компилировать (или делать это правильно),
		// либо сразу в DOM-элементы возвращать из compile DOM-ноду
		if (this._element && block) {
			this._element.innerHTML = block;
		}

	}

	// Может переопределять пользователь, необязательно трогать
	render(): string | void { }

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: TProps) {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		const self = this;

		const proxyProps = new Proxy(props, {
			get(target, prop: string) {
				if (prop.indexOf('_') === 0) {
					throw new Error('нет доступа');
				}
				const value = target[prop]
				return typeof value === "function" ? value.bind(target) : value
			},
			set(target, prop: string, value) {
				if (prop.indexOf('_') === 0) {
					throw new Error('нет доступа');
				}
				const oldProps = target[prop]
				target[prop] = value
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, value);
				return true
			},
			deleteProperty(target, prop: string) {
				if (prop.indexOf('_') === 0) {
					throw new Error('нет доступа');
				}
				delete target[prop]
				return true
			}
		})
		return proxyProps
	}

	_createDocumentElement(tagName: string) {
		//TODO: Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show() {
		if(this.getContent() !== null){
			this.getContent()!.style.display = "block";
		}
		
	}

	hide() {
		if(this.getContent() !== null){
			this.getContent()!.style.display = "none";
		}
	}
}