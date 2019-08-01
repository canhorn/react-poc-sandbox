import React, { useEffect, useState } from "react";
import { getSkillList } from "../state/SkillEditorState";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { ISkill } from "../api/ISkill";
import { RouteComponentProps } from "react-router";

const COLUMNS = [
  {
    key: "id",
    name: "Id",
    fieldName: "id",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: "name",
    name: "Name",
    fieldName: "name",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  }
];

export const skillContainsFilterParser = (skill: ISkill, filter: string) => {
  if (filter.toLocaleLowerCase().indexOf("deepsearch:") === 0) {
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
    .indexOf(filter) >= 0;

export function SkillList({ match, history }: RouteComponentProps) {
  const [skillList, setSkillList] = useState(getSkillList());
  const [filter, setFilter] = useState<string>("");
  const [detailsList, setDetailsList] = useState<ISkill[]>([]);
  useEffect(() => {
    setDetailsList(
      skillList
        .map(skill => ({
          ...skill
        }))
        .filter(
          skill => filter === "" || skillContainsFilterParser(skill, filter)
        )
    );
  }, [skillList, filter]);
  const onItemInvoked = (skill: ISkill) => {
    console.log("Open " + skill.name);
    history.push(`/skill-editor/edit/${skill.id}`);
  };
  const onChangeText = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ) => {
    setFilter(text || "");
  };
  return (
    <>
      <TextField
        label="Search:"
        underlined
        description="Prefix search with 'deepsearch:' to search into skills."
        onChange={onChangeText}
      />
      <DetailsList
        items={detailsList}
        selectionMode={SelectionMode.none}
        columns={COLUMNS}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        onItemInvoked={onItemInvoked}
      />
    </>
  );
}
