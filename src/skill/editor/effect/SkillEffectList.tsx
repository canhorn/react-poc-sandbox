import { DefaultButton, IconButton } from 'office-ui-fabric-react';
import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import React, { useEffect, useState } from 'react';
import { ISkillEffect } from '../../api/ISkill';
import TutorialBubble from '../../tutorial/TutorialBubble';

const COLUMNS = [
    {
        key: 'effect',
        name: 'Effect',
        fieldName: 'effect',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    },
];

export const filterSearch = (skill: ISkillEffect, filter: string) => {
    if (filter.toLocaleLowerCase().indexOf('deepsearch:') === 0) {
        return deepSearchSkill(skill, filter.substring(11));
    }
    return search(skill, filter);
};

export const search = (effect: ISkillEffect, filter: string) =>
    effect.effect.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;

export const deepSearchSkill = (effect: ISkillEffect, filter: string) =>
    JSON.stringify(effect || {})
        .toLocaleLowerCase()
        .indexOf(filter.toLocaleLowerCase()) >= 0;

interface IProps {
    effectList: ISkillEffect[];
    onSelected: (index: number) => void;
    onAdd?: () => void;
    onDelete: (index: number) => void;
}

export function SkillEffectList({
    effectList,
    onSelected,
    onAdd,
    onDelete,
}: IProps) {
    const [filter, setFilter] = useState<string>('');
    const [filteredList, setFilteredList] = useState<ISkillEffect[]>([]);
    useEffect(() => {
        setFilteredList(
            effectList
                .map((effect: ISkillEffect) => ({
                    ...effect,
                }))
                .filter(
                    (effect: ISkillEffect) =>
                        filter === '' || filterSearch(effect, filter)
                )
        );
    }, [effectList, filter]);
    const onItemInvoked = (effect: ISkillEffect, index: number | undefined) => {
        if (index !== undefined) {
            onSelected(index);
        }
    };
    const onChangeText = (
        ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        text: string | undefined
    ) => {
        setFilter(text || '');
    };
    const onRenderItemColumn = (
        item: ISkillEffect,
        index?: number,
        column?: IColumn
    ) => {
        if (index === undefined || column === undefined) {
            return;
        }
        const fieldContent = item[column.fieldName as keyof ISkillEffect];

        if (column.key === 'effect') {
            return (
                <div>
                    {fieldContent}
                    <IconButton
                        menuIconProps={{ iconName: 'MoreVertical' }}
                        role="button"
                        aria-haspopup={true}
                        aria-label="Show actions"
                        styles={{ root: { float: 'right', height: 'inherit' } }}
                        menuProps={{
                            items: [
                                {
                                    key: 'delete',
                                    text: 'Delete',
                                    onClick: () => onDelete(index),
                                },
                            ],
                        }}
                    />
                </div>
            );
        } else {
            return <span>{fieldContent}</span>;
        }
    };
    return (
        <>
            <TextField
                label="Search:"
                underlined
                description="Prefix search with 'deepsearch:' to search into effects."
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
                    onRenderItemColumn={onRenderItemColumn}
                />
            </TutorialBubble>
            {onAdd ? <DefaultButton onClick={onAdd}>Add</DefaultButton> : []}
        </>
    );
}
