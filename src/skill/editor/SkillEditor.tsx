import {
    IStackItemStyles,
    IStackStyles,
    IStackTokens,
    Stack,
} from 'office-ui-fabric-react';
import { ITextStyles, Text } from 'office-ui-fabric-react/lib/Text';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { IEventService } from '../../core/event';
import { Inject } from '../../core/ioc';
import { ISkill, ISkillEffect, ISkillEffectBase } from '../api/ISkill';
import {
    SkillChangedEventData,
    SKILL_CHANGED_EVENT,
} from '../changed/SkillChangedEvent';
import { getSkill, updateSkill } from '../state/SkillEditorState';
import SkillEffectEdit from './effect/SkillEffectEdit';
import SkillEffectMappingEdit from './effect/SkillEffectMappingEdit';
import { useSkillEffectListState } from './UseSkillEffectListState';
import { useSkillEffectSelected } from './UseSkillEffectSelected';

// Styles definition
const stackStyles: IStackStyles = {
    root: {},
};
const stackItemStyles: IStackItemStyles = {
    root: {
        fontWeight: 'bold',
        display: 'flex',
        minHeight: '15em',
        width: '50%',
        padding: '1em',
    },
};
const headerStyles: ITextStyles = {
    root: {
        fontWeight: 'bold',
    },
};
const stackTokens: IStackTokens = {
    childrenGap: 5,
    padding: '1em',
};

export default function SkillEditor({
    match,
}: RouteComponentProps<{ skillId: string }>) {
    const [skill, setSkill] = useState<ISkill | undefined>(
        getSkill(match.params.skillId)
    );
    const {
        selectedSkillEffect,
        selectedSkillEffectIndex,
        selectedSkillFailedIndex,
        onEffectSelect,
        onFailedSelect,
        onValidatorSelect,
        reset,
    } = useSkillEffectSelected(skill);

    useEffect(() => {
        const eventService: IEventService = Inject(IEventService);
        if (skill) {
            const onSkillUpdated = ({ actionType }: SkillChangedEventData) => {
                if (actionType === 'DELETE_ACTION') {
                    reset();
                }
                setSkill(getSkill(match.params.skillId));
            };
            eventService.on(SKILL_CHANGED_EVENT, onSkillUpdated, 'SkillEditor');
            return () => {
                eventService.off(
                    SKILL_CHANGED_EVENT,
                    onSkillUpdated,
                    'SkillEditor'
                );
            };
        }
    }, [skill]);

    const onSkillEffectChanged = createOnSkillEffectChanged(
        skill,
        selectedSkillEffectIndex,
        selectedSkillFailedIndex
    );

    const {
        onValidatorAddClicked,
        onEffectAddClick,
        onEffectDeleteClick,
        onFailedAddClick,
        onFailedDeleteClick,
    } = useSkillEffectListState(skill, onSkillEffectChanged);

    const onBack = () => {
        reset();
    };
    if (!skill) {
        return (
            <>
                <Text nowrap block onContextMenu={() => alert('open context')}>
                    {match.params.skillId}
                </Text>
            </>
        );
    }
    return (
        <>
            <Text nowrap block onContextMenu={() => alert('open context')}>
                {match.params.skillId}
            </Text>
            {selectedSkillEffect ? (
                <SkillEffectEdit
                    effect={selectedSkillEffect}
                    onChange={onSkillEffectChanged}
                    onBack={onBack}
                />
            ) : (
                <Stack>
                    <TextField
                        label="Description"
                        underlined
                        value={skill.description}
                    />
                    <TextField label="Type" underlined value={skill.type} />
                    <TextField label="Target" underlined value={skill.target} />
                    <SkillEffectMappingEdit
                        validatorList={skill.validatorList || []}
                        effectList={skill.next || []}
                        failedList={skill.failedList || []}
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
                </Stack>
            )}
            <hr />
            <pre>{JSON.stringify(skill, null, 4)}</pre>
        </>
    );
}

const createOnSkillEffectChanged = (
    skill: ISkill | undefined,
    selectedSkillEffectIndex: number,
    selectedSkillFailedIndex: number
) => (effect: ISkillEffectBase) => {
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
    updateSkill(skill);
};
