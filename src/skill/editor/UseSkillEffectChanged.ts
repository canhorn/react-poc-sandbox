import { ISkillEffect, ISkillEffectBase } from '../api/ISkill';

export const useSkillEffectChanged = (
    skill: ISkillEffectBase | undefined,
    selectedSkillEffectIndex: number,
    selectedSkillFailedIndex: number,
    onUpdate: (skill: ISkillEffectBase) => void
) => ({
    onSkillEffectChanged: (effect: ISkillEffectBase) => {
        if (!skill) {
            return;
        }
        if (selectedSkillEffectIndex >= 0) {
            if (!skill.next) {
                skill.next = [];
            }
            skill.next[selectedSkillEffectIndex] = effect as ISkillEffect;
        } else if (selectedSkillFailedIndex >= 0) {
            if (!skill.failedList) {
                skill.failedList = [];
            }
            skill.failedList[selectedSkillFailedIndex] = effect as ISkillEffect;
        }
        onUpdate(skill);
    },
});
