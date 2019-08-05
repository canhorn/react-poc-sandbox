import skillEditorState from './skill-editor-state.json';
import { ISkill } from '../api/ISkill.js';
import { IEventService } from '../../core/event';
import { Inject } from '../../core/ioc';
import { createSkillChangedEvent } from '../changed/SkillChangedEvent';

interface ISkillEditorState {
    skillList: ISkill[];
}

const SKILL_MAP: Map<string, ISkill> = new Map();
const SKILL_LIST: ISkill[] = [];

const setupSkillMap = ({ skillList }: { skillList: ISkill[] }) => {
    skillList.forEach(skill => {
        SKILL_LIST.push(skill);
        SKILL_MAP.set(skill.id, skill);
    });
};
setupSkillMap(skillEditorState);

export const getSkillList = () => SKILL_LIST;

export const getSkill = (skillId: string) => {
    return SKILL_MAP.get(skillId);
};

export const updateSkill = (
    skill: ISkill,
    eventService: IEventService = Inject(IEventService)
) => {
    SKILL_MAP.set(skill.id, { ...skill, $$pendingSave: true });
    SKILL_LIST.splice(0, SKILL_LIST.length);
    SKILL_MAP.forEach(skill => {
        SKILL_LIST.push(skill);
    });
    eventService.publish(
        createSkillChangedEvent({ actionType: 'ADDED_TO_ACTION' })
    );
};
