import { ISkillEffectBase } from '../api/ISkill';

export const useSkillEffectListState = (
    effect: ISkillEffectBase | undefined,
    onChange: (effect: ISkillEffectBase) => void
) => {
    const onValidatorAddClicked = () => {
        if (!effect) {
            return;
        }
        if (!effect.validatorList) {
            effect.validatorList = [];
        }
        effect.validatorList = [
            ...effect.validatorList,
            {
                validator: 'Validators_New.csx',
                comment: 'The validator script will log text to server.',
            },
        ];
        onChange(effect);
    };
    const onValidatorDeleteClick = (toDeleteIndex: number) => {
        if (!effect) {
            return;
        }
        if (!effect.validatorList) {
            effect.validatorList = [];
        }
        effect.validatorList = effect.validatorList.filter(
            (_, index) => index !== toDeleteIndex
        );
        onChange(effect);
    };
    const onEffectAddClick = () => {
        if (!effect) {
            return;
        }
        if (!effect.next) {
            effect.next = [];
        }
        effect.next = [
            ...effect.next,
            {
                effect: 'Effects_New.csx',
                comment: 'The effect script will log text to server.',
            },
        ];
        onChange(effect);
    };
    const onEffectDeleteClick = (toDeleteIndex: number) => {
        if (!effect) {
            return;
        }
        if (!effect.next) {
            effect.next = [];
        }
        effect.next = effect.next.filter((_, index) => index !== toDeleteIndex);
        onChange(effect);
    };
    const onFailedAddClick = () => {
        if (!effect) {
            return;
        }
        if (!effect.failedList) {
            effect.failedList = [];
        }
        effect.failedList = [
            ...effect.failedList,
            {
                effect: 'Effects_New.csx',
                comment: 'The effect script will log text to server.',
            },
        ];
        onChange(effect);
    };
    const onFailedDeleteClick = (toDeleteIndex: number) => {
        if (!effect) {
            return;
        }
        if (!effect.failedList) {
            effect.failedList = [];
        }
        effect.failedList = effect.failedList.filter(
            (_, index) => index !== toDeleteIndex
        );
        onChange(effect);
    };

    return {
        onValidatorAddClicked,
        onValidatorDeleteClick,
        onEffectAddClick,
        onEffectDeleteClick,
        onFailedAddClick,
        onFailedDeleteClick,
    };
};
