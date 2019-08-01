import skillEditorState from "./skill-editor-state.json";
import { ISkill } from "../api/ISkill.js";

interface ISkillEditorState {
  skillList: ISkill[];
}

const STATE: ISkillEditorState = skillEditorState;

export const getSkillList = () => STATE.skillList;

export const getSkill = (skillId: string) => {
  return STATE.skillList.filter(skill => skill.id == skillId)[0];
};
