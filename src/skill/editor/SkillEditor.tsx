import { Stack } from 'office-ui-fabric-react';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { IEventService } from '../../core/event';
import { Inject } from '../../core/ioc';
import { ISkill, ISkillEffectBase } from '../api/ISkill';
import {
    SkillChangedEventData,
    SKILL_CHANGED_EVENT,
} from '../changed/SkillChangedEvent';
import { getSkill, updateSkill } from '../state/SkillEditorState';
import SkillEffectEdit from './effect/SkillEffectEdit';
import SkillEffectMappingEdit from './effect/SkillEffectMappingEdit';
import { useSkillEffectChanged } from './UseSkillEffectChanged';
import { useSkillEffectListState } from './UseSkillEffectListState';
import { useSkillEffectSelected } from './UseSkillEffectSelected';

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
    }, [skill, match.params.skillId, reset]);

    const { onSkillEffectChanged } = useSkillEffectChanged(
        skill,
        selectedSkillEffectIndex,
        selectedSkillFailedIndex,
        (skill: ISkillEffectBase) => {
            updateSkill(skill as ISkill);
        }
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
