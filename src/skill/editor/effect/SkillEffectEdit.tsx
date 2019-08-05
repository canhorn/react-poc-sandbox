import { DefaultButton } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import React from 'react';
import { ISkillEffect, ISkillEffectBase } from '../../api/ISkill';
import DataEditor from '../data/DataEditor';
import { useSkillEffectChanged } from '../UseSkillEffectChanged';
import { useSkillEffectListState } from '../UseSkillEffectListState';
import { useSkillEffectSelected } from '../UseSkillEffectSelected';
import SkillEffectMappingEdit from './SkillEffectMappingEdit';

interface IProps {
    effect: ISkillEffect;
    onChange: (effect: ISkillEffectBase) => void;
    onBack: () => void;
}

export default function SkillEffectEdit({
    effect,
    onChange: onChangeToParent,
    onBack: onBackToParent,
}: IProps) {
    const onBack = () => {
        reset();
    };
    const {
        selectedSkillEffect,
        selectedSkillEffectIndex,
        selectedSkillFailedIndex,
        onEffectSelect,
        onFailedSelect,
        onValidatorSelect,
        reset,
    } = useSkillEffectSelected(effect);

    const {
        onValidatorAddClicked,
        onEffectAddClick,
        onEffectDeleteClick,
        onFailedAddClick,
        onFailedDeleteClick,
    } = useSkillEffectListState(effect, onChangeToParent);

    const onChanged = (
        _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        newValue: string | undefined
    ) => {
        effect.effect = newValue || '';
        onChangeToParent(effect);
    };
    const onDataChanged = (data: any) => {
        effect.data = data;
        onChangeToParent(effect);
    };

    const { onSkillEffectChanged } = useSkillEffectChanged(
        effect,
        selectedSkillEffectIndex,
        selectedSkillFailedIndex,
        (skill: ISkillEffectBase) => {
            onChangeToParent(skill);
        }
    );

    return (
        <>
            {selectedSkillEffect ? (
                <SkillEffectEdit
                    effect={selectedSkillEffect}
                    onChange={onSkillEffectChanged}
                    onBack={onBack}
                />
            ) : (
                <>
                    <DefaultButton onClick={onBackToParent}>Back</DefaultButton>
                    <TextField
                        label="Effect Name"
                        underlined
                        value={effect.effect}
                        onChange={onChanged}
                    />
                    <DataEditor data={effect.data} onChange={onDataChanged} />
                    <SkillEffectMappingEdit
                        validatorList={effect.validatorList || []}
                        effectList={effect.next || []}
                        failedList={effect.failedList || []}
                        events={{
                            onValidatorSelect,
                            onValidatorAddClicked,
                            onEffectSelect,
                            onEffectAddClick,
                            onEffectDeleteClick,
                            onFailedSelect,
                            onFailedAddClick,
                            onFailedDeleteClick,
                        }}
                    />
                </>
            )}

            <pre>{JSON.stringify(effect, null, 4)}</pre>
        </>
    );
}
