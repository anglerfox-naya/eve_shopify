// https://blog.k.io/atech/creating-a-simple-custom-event-system-in-javascript

class EventBusEvent {
  constructor(eventName) {
    this.eventName = eventName;
    this.callbacks = [];
  }

  registerCallback(callback) {
    this.callbacks.push(callback);
  }

  unregisterCallback(callback) {
    const index = this.callbacks.indexOf(callback);

    if (index > -1) {
      this.callbacks.splice(index, 1);
    }
  }

  fire(data) {
    const callbacks = this.callbacks.slice(0);

    callbacks.forEach((callback) => {
      callback(data);
    });
  }
}

class EventBus {
  constructor() {
    this.events = {};
  }

  trigger(eventName, data) {
    const event = this.events[eventName];

    if (event) {
      event.fire(data);
    }
  }

  on(eventName, callback) {
    let event = this.events[eventName];

    if (!event) {
      event = new EventBusEvent(eventName);
      this.events[eventName] = event;
    }

    event.registerCallback(callback);
  }

  off(eventName, callback) {
    const event = this.events[eventName];

    if (event && event.callbacks.indexOf(callback) > -1) {
      event.unregisterCallback(callback);

      if (event.callbacks.length === 0) {
        delete this.events[eventName];
      }
    }
  }
}

export default EventBus;
