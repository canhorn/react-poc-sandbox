import { getId, TooltipHost } from 'office-ui-fabric-react';
import {
    DetailsList,
    DetailsListLayoutMode,
    DetailsRow,
    IColumn,
    IDetailsRowProps,
    IDetailsRowStyles,
    SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { ISkill } from '../api/ISkill';
import { getSkillList } from '../state/SkillEditorState';
import TutorialBubble from '../tutorial/TutorialBubble';

const COLUMNS = [
    {
        key: 'id',
        name: 'Id',
        fieldName: 'id',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    },
    {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    },
];

export const skillContainsFilterParser = (skill: ISkill, filter: string) => {
    if (filter.toLocaleLowerCase().indexOf('deepsearch:') === 0) {
        return deepSearchSkill(skill, filter.substring(11));
    }
    return searchSkill(skill, filter);
};

export const searchSkill = (skill: ISkill, filter: string) =>
    skill.id.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 ||
    skill.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 ||
    skill.description.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >=
        0 ||
    skill.type.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 ||
    skill.target.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;

export const deepSearchSkill = (skill: ISkill, filter: string) =>
    JSON.stringify(skill || {})
        .toLocaleLowerCase()
        .indexOf(filter.toLocaleLowerCase()) >= 0;

export function SkillList({ match, history }: RouteComponentProps) {
    const [skillList] = useState(getSkillList());
    const [filter, setFilter] = useState<string>('');
    const [detailsList, setDetailsList] = useState<ISkill[]>([]);
    useEffect(() => {
        setDetailsList(
            skillList
                .map((skill: ISkill) => ({
                    ...skill,
                }))
                .filter(
                    (skill: ISkill) =>
                        filter === '' ||
                        skillContainsFilterParser(skill, filter)
                )
        );
    }, [skillList, filter]);
    const onItemInvoked = (skill: ISkill) => {
        console.log('Open ' + skill.name);
        history.push(`/skill-editor/edit/${skill.id}`);
    };
    const onChangeText = (
        ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        text: string | undefined
    ) => {
        setFilter(text || '');
    };
    const onRenderItemColumn = (
        item?: ISkill,
        index?: number,
        column?: IColumn
    ) => {
        if (item === undefined || column === undefined) {
            return <>NOT FOUND</>;
        }
        const fieldContent = item[column.fieldName as keyof ISkill];

        if (item.$$pendingSave && column.fieldName === 'id') {
            return <>* {fieldContent}</>;
        }
        return <>{fieldContent}</>;
    };
    const onRenderRow = (props?: IDetailsRowProps) => {
        const hostId: string = getId('skill-list-pending-save-tooltip');
        if (props === undefined) {
            return <>NOT FOUND</>;
        }
        const item: ISkill = props.item;
        if (item.$$pendingSave) {
            const customStyles: Partial<IDetailsRowStyles> = {};
            customStyles.root = {
                fontWeight: 'bold',
            };
            return (
                <TooltipHost
                    content="This skill needs to be saved."
                    id={hostId}
                    calloutProps={{ gapSpace: 0 }}
                >
                    <DetailsRow {...props} styles={customStyles} />
                </TooltipHost>
            );
        }
        return <DetailsRow {...props} />;
    };
    return (
        <>
            <TextField
                label="Search:"
                underlined
                description="Prefix search with 'deepsearch:' to search into skills."
                onChange={onChangeText}
            />
            <TutorialBubble stepKey="step_1">
                <DetailsList
                    items={detailsList}
                    selectionMode={SelectionMode.none}
                    columns={COLUMNS}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    onItemInvoked={onItemInvoked}
                    onRenderItemColumn={onRenderItemColumn}
                    onRenderRow={onRenderRow}
                />
            </TutorialBubble>
        </>
    );
}
