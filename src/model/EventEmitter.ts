type Callback<T> = (item: T, ...args: any) => any;

class EventEmitter<T> {

  protected subscribers: Map<string, Callback<T>[]> = new Map();

  emit(eventName: string, self: T, ...args: any[]) {
    if (this.subscribers.has(eventName)) {
      this.subscribers.get(eventName).forEach(cb => cb(self, ...args));
    }
  }

  on(eventName: string, callback: Callback<T>) {
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, []);
    }

    this.subscribers.get(eventName).push(callback);
  }

  protected copySubscribersOn(other: EventEmitter<T>) {
    this.subscribers.forEach((callbacks, eventName) => {
      callbacks.forEach(callback => other.on(eventName, callback));
    });
  }
}

export default EventEmitter;