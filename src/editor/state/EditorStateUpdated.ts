import { IEventType, EventType, IEvent } from "../../core/event";

export const EDITOR_STATE_UPDATED: IEventType = new EventType(
  "EDITOR_STATE_UPDATED"
);

export const createEditorStateUpdatedEvent = (): IEvent => ({
  type: EDITOR_STATE_UPDATED
});
