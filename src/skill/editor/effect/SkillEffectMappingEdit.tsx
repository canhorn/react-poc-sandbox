import React from 'react';
import {
    Stack,
    IStackStyles,
    IStackItemStyles,
    IStackTokens,
} from 'office-ui-fabric-react';
import { ITextStyles, Text } from 'office-ui-fabric-react/lib/Text';
import { SkillEffectList } from './SkillEffectList';
import { SkillValidatorList } from '../validator/SkillValidatorList';
import { ISkillValidator, ISkillEffect } from '../../api/ISkill';

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

interface IProps {
    validatorList: ISkillValidator[];
    effectList: ISkillEffect[];
    failedList: ISkillEffect[];
    events: {
        onValidatorSelect: (validator: ISkillValidator) => void;
        onEffectSelect: (effectIndex: number) => void;
        onFailedSelect: (failedIndex: number) => void;

        onValidatorAddClicked?: () => void;
        onEffectAddClick?: () => void;
        onEffectDeleteClick: (index: number) => void;
        onFailedAddClick?: () => void;
        onFailedDeleteClick: (index: number) => void;
    };
}

export default function SkillEffectMappingEdit({
    validatorList,
    effectList,
    failedList,
    events: {
        onValidatorSelect,
        onEffectSelect,
        onFailedSelect,

        onValidatorAddClicked,
        onEffectAddClick,
        onEffectDeleteClick,
        onFailedAddClick,
        onFailedDeleteClick,
    },
}: IProps) {
    return (
        <Stack horizontal styles={stackStyles} tokens={stackTokens}>
            <Stack.Item grow={1} styles={stackItemStyles}>
                <Stack styles={{ root: { width: '100%' } }}>
                    <Text styles={headerStyles} variant={'large'}>
                        Next
                    </Text>
                    <SkillEffectList
                        effectList={effectList}
                        onSelected={onEffectSelect}
                        onAdd={onEffectAddClick}
                        onDelete={onEffectDeleteClick}
                    />
                </Stack>
            </Stack.Item>
            <Stack.Item grow={1} styles={stackItemStyles}>
                <Stack styles={{ root: { width: '100%' } }}>
                    <Text styles={headerStyles} variant={'large'}>
                        Validators
                    </Text>
                    <SkillValidatorList
                        validatorList={validatorList}
                        onSelected={onValidatorSelect}
                        onAdd={onValidatorAddClicked}
                    />
                    <hr style={{ width: '100%' }} />
                    <Text styles={headerStyles} variant={'large'}>
                        On Fail
                    </Text>
                    <SkillEffectList
                        effectList={failedList || []}
                        onSelected={onFailedSelect}
                        onAdd={onFailedAddClick}
                        onDelete={onFailedDeleteClick}
                    />
                </Stack>
            </Stack.Item>
        </Stack>
    );
}
