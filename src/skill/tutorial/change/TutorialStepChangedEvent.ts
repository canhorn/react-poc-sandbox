import { EventType, IEvent, IEventType } from '../../../core/event';

/**
 * Name: TutorialStepChangedEvent
 * NameSpace: Tutorial
 * Type: Event
 */
export const TUTORIAL_STEP_CHANGED_EVENT = new EventType(
    'Tutorial.TUTORIAL_STEP_CHANGED_EVENT'
);
class EventClass implements IEvent {
    public type: IEventType = TUTORIAL_STEP_CHANGED_EVENT;
    public data?: TutorialStepChangedEventData;
}
const instanceOfEvent = new EventClass();
export const createTutorialStepChangedEvent = (
    data: TutorialStepChangedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface TutorialStepChangedEventData {}
