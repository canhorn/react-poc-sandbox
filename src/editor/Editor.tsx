import "./Editor.css";
import * as React from "react";
import { getEditorState, IEditorServerState } from "./state/EditorState";
import { fetchEditorState } from "./state/FetchEditorState";
import EditorHome from "./home/EditorHome";
import TextEditor from "./text/TextEditor";
import { Switch, Route } from "react-router";
import EditorSidebar from "./sidebar/EditorSidebar";
import { createLogger, ILogger } from "../core/logger";
import { IEventService } from "../core/event";
import { Inject } from "../core/ioc";
import { EDITOR_STATE_UPDATED } from "./state/EditorStateUpdated";
import { SkillEditorContainer } from "../skill/SkillEditorContainer";

export interface IProps {}
export interface IState {
  editorState: IEditorServerState;
}

class Editor extends React.Component<IProps, IState> {
  state: IState = {
    editorState: getEditorState()
  };
  private readonly _logger: ILogger = createLogger("View.Editor");
  private readonly _eventService: IEventService = Inject(IEventService);

  async componentDidMount() {
    this._eventService.on(
      EDITOR_STATE_UPDATED,
      this.onEditorStateUpdated,
      this
    );
    try {
      await fetchEditorState();
    } catch (ex) {
      this._logger.error("Some Error", ex);
    }
  }
  componentWillUnmount() {
    this._eventService.off(
      EDITOR_STATE_UPDATED,
      this.onEditorStateUpdated,
      this
    );
  }
  onEditorStateUpdated() {
    this.setState({
      editorState: getEditorState()
    });
  }

  render() {
    return (
      <div className="editor">
        <div className="editor-sidebar">
          <EditorSidebar editorState={this.state.editorState} />
        </div>
        <div className="editor-main">
          <Switch>
            <Route path="/skill-editor" component={SkillEditorContainer} />
            <Route path="/text-editor" component={TextEditor} />
            <Route path="/" component={EditorHome} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Editor;
