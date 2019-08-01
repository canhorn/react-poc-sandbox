import * as React from "react";
import { Component } from "react";
import "./TextEditor.css";
import { Route } from "react-router-dom";
import FileEditor from "./file/FileEditor";

export interface ITextEditorProps {}
export interface ITextEditorState {}

class TextEditor extends Component<ITextEditorProps, ITextEditorState> {
  state: ITextEditorState = {};
  async componentDidMount() {}

  render() {
    return (
      <div className="text-editor">
        <h1>Text Editor</h1>
        <div>
          <Route path="/text-editor/file/:fileId" component={FileEditor} />
        </div>
      </div>
    );
  }
}

export default TextEditor;
