import { EventType, IEvent, IEventType } from '../../core/event';

/**
 * Name: SkillChangedEvent
 * NameSpace: Skill
 * Type: Event
 */
export const SKILL_CHANGED_EVENT = new EventType('Skill.SKILL_CHANGED_EVENT');
class EventClass implements IEvent {
    public type: IEventType = SKILL_CHANGED_EVENT;
    public data?: SkillChangedEventData;
}
const instanceOfEvent = new EventClass();
export const createSkillChangedEvent = (
    data: SkillChangedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface SkillChangedEventData {
    actionType: 'DELETE_ACTION' | 'ADDED_TO_ACTION';
}
