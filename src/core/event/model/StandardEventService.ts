import { IEventListener } from "../api/IEventListener";
import { IEventService } from "../api/IEventService";
import { IEvent } from "../api/IEvent";
import { IEventType } from "../api/IEventType";

export class StandardEventService implements IEventService {
  private _eventListenerList: Map<string, IEventListener[]> = new Map<
    string,
    IEventListener[]
  >();

  public publish(event: IEvent): void {
    const eventListeners = this._eventListenerList.get(event.type.key) || [];
    const len = eventListeners.length;
    for (let index = 0; index < len; index++) {
      const listener = eventListeners[index];
      try {
        listener.function.call(listener.context, event.data);
      } catch (ex) {
        console.error("Listener failed", ex);
      }
    }
  }

  public on(
    type: IEventType,
    eventListener: (data: any) => void,
    context: any
  ): IEventService {
    const listenerList = this._eventListenerList.get(type.key) || [];
    listenerList.push({
      function: eventListener,
      context
    });
    this._eventListenerList.set(type.key, listenerList);

    return this;
  }

  public off(
    type: IEventType,
    eventListener: (data: any) => void,
    context: any
  ): IEventService {
    this._eventListenerList.set(
      type.key,
      (this._eventListenerList.get(type.key) || []).filter(
        listener =>
          listener.function !== eventListener || listener.context !== context
      )
    );
    return this;
  }
}
