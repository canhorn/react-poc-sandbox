import {
    DetailsList,
    DetailsListLayoutMode,
    SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import React, { useEffect, useState } from 'react';
import { ISkillValidator } from '../../api/ISkill';
import { DefaultButton } from 'office-ui-fabric-react';
import TutorialBubble from '../../tutorial/TutorialBubble';

const COLUMNS = [
    {
        key: 'validator',
        name: 'Validator',
        fieldName: 'validator',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    },
];

export const filterSearch = (skill: ISkillValidator, filter: string) => {
    if (filter.toLocaleLowerCase().indexOf('deepsearch:') === 0) {
        return deepSearchSkill(skill, filter.substring(11));
    }
    return search(skill, filter);
};

export const search = (validator: ISkillValidator, filter: string) =>
    validator.validator
        .toLocaleLowerCase()
        .indexOf(filter.toLocaleLowerCase()) >= 0;

export const deepSearchSkill = (validator: ISkillValidator, filter: string) =>
    JSON.stringify(validator || {})
        .toLocaleLowerCase()
        .indexOf(filter.toLocaleLowerCase()) >= 0;

interface IProps {
    validatorList: ISkillValidator[];
    onSelected: (validator: ISkillValidator) => void;
    onAdd?: () => void;
}

export function SkillValidatorList({
    validatorList,
    onSelected,
    onAdd,
}: IProps) {
    const [filter, setFilter] = useState<string>('');
    const [filteredList, setFilteredList] = useState<ISkillValidator[]>([]);
    useEffect(() => {
        setFilteredList(
            validatorList
                .map((validator: ISkillValidator) => ({
                    ...validator,
                }))
                .filter(
                    (validator: ISkillValidator) =>
                        filter === '' || filterSearch(validator, filter)
                )
        );
    }, [validatorList, filter]);
    const onItemInvoked = (validator: ISkillValidator) => {
        onSelected(validator);
    };
    const onChangeText = (
        ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        text: string | undefined
    ) => {
        setFilter(text || '');
    };
    return (
        <>
            <TextField
                label="Search:"
                underlined
                description="Prefix search with 'deepsearch:' to search into validators."
                onChange={onChangeText}
            />
            <TutorialBubble stepKey="step_1">
                <DetailsList
                    items={filteredList}
                    selectionMode={SelectionMode.none}
                    columns={COLUMNS}
                    isHeaderVisible={false}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    onItemInvoked={onItemInvoked}
                />
            </TutorialBubble>
            {onAdd ? <DefaultButton onClick={onAdd}>Add</DefaultButton> : []}
        </>
    );
}
