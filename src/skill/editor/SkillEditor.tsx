import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { Text } from "office-ui-fabric-react/lib/Text";
import { ISkill } from "../api/ISkill";
import { getSkill } from "../state/SkillEditorState";

export default function SkillEditor({
  match
}: RouteComponentProps<{ skillId: string }>) {
  const [skill, setSkill] = useState<ISkill | undefined>(
    getSkill(match.params.skillId)
  );
  return (
    <>
      <Text nowrap block onContextMenu={() => alert("open context")}>
        {match.params.skillId}
      </Text>
        <pre>{JSON.stringify(skill, null, 4)}</pre>
    </>
  );
}
