import * as React from "react";
import { Switch, Route } from "react-router";
import { SkillList } from "./list/SkillList";
import SkillEditor from './editor/SkillEditor';

export function SkillEditorContainer() {
  return (
    <>
      <h1>Skill Editor</h1>
      <Switch>
        <Route path="/skill-editor/edit/:skillId" component={SkillEditor} />
        <Route path="/skill-editor" component={SkillList} />
      </Switch>
    </>
  );
}
