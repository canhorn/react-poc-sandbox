import {
    IStackItemStyles,
    IStackStyles,
    IStackTokens,
    DefaultButton,
} from 'office-ui-fabric-react';
import { ITextStyles } from 'office-ui-fabric-react/lib/Text';
import React, { useEffect, useState } from 'react';
import {
    ISkillEffect,
    ISkillValidator,
    ISkill,
    ISkillEffectBase,
} from '../../api/ISkill';
import SkillEffectMappingEdit from './SkillEffectMappingEdit';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { useSkillEffectSelected } from '../UseSkillEffectSelected';
import { useSkillEffectListState } from '../UseSkillEffectListState';
import DataEditor from '../data/DataEditor';

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

    return (
        <>
            {selectedSkillEffect ? (
                <SkillEffectEdit
                    effect={selectedSkillEffect}
                    onChange={() => console.log('Changed')}
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
