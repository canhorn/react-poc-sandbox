import { useEffect, useState } from 'react';
import { ISkillEffect, ISkillEffectBase, ISkillValidator } from '../api/ISkill';

export const useSkillEffectSelected = (
    effect: ISkillEffectBase | undefined
) => {
    const [selectedSkillEffect, setSelectedSkillEffect] = useState<
        ISkillEffect | undefined
    >(undefined);
    const [selectedSkillEffectIndex, setSelectedSkillEffectIndex] = useState<
        number
    >(-1);
    const [selectedSkillFailedIndex, setSelectedSkillFailedIndex] = useState<
        number
    >(-1);
    useEffect(() => {
        if (effect && effect.next && selectedSkillEffectIndex >= 0) {
            setSelectedSkillEffect(effect.next[selectedSkillEffectIndex]);
        }
    }, [effect, selectedSkillEffectIndex]);
    useEffect(() => {
        if (effect && effect.failedList && selectedSkillFailedIndex >= 0) {
            setSelectedSkillEffect(effect.failedList[selectedSkillFailedIndex]);
        }
    }, [effect, selectedSkillFailedIndex]);
    const onValidatorSelected = (validator: ISkillValidator) => {
        console.log('Validator selected', validator);
    };
    const onEffectSelected = (effectIndex: number) =>
        setSelectedSkillEffectIndex(effectIndex);
    const onFailedSelected = (failedIndex: number) =>
        setSelectedSkillFailedIndex(failedIndex);
    const reset = () => {
        setSelectedSkillEffectIndex(-1);
        setSelectedSkillFailedIndex(-1);
        setSelectedSkillEffect(undefined);
    };

    return {
        selectedSkillEffect,
        selectedSkillEffectIndex,
        selectedSkillFailedIndex,
        onValidatorSelect: onValidatorSelected,
        onEffectSelect: onEffectSelected,
        onFailedSelect: onFailedSelected,
        reset,
    };
};
