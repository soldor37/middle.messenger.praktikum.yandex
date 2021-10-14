class EventBus {
    constructor() {
      this.listeners = {};
    }
  
    on(event, callback) {
      if(!this.listeners[event]){
        this.listeners[event] = []
      }
      this.listeners[event].push(callback)
    }
  
    off(event, callback) {
      if(!this.listeners[event]){
        throw new Error(`Нет события: ${event}`)
      }
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback)
    }
  
    emit(event, ...args) {
      if(!this.listeners[event]){
        throw new Error(`Нет события: ${event}`)
      }
      this.listeners[event].forEach((listener)=>listener(...args))
    }
  }

export default new EventBus();
//   const eventBus = new EventBus();
   
//   eventBus.on('common:event-1', handlerEvent1);
//   eventBus.on('common:event-1', handlerEvent2);
  
//   eventBus.emit('common:event-1', 42, 10);
//   eventBus.off('common:event-1', handlerEvent2);
  
//   eventBus.emit('common:event-1', 84, 20);